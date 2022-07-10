import {Op, Sequelize} from 'sequelize';
import Course from '../../core/database/models/course';
import Favorite from '../../core/database/models/favorite';
import User from '../../core/database/models/user';
import Category from '../../core/database/models/category';
import Subject from '../../core/database/models/subject';
import Enrollment from '../../core/database/models/enrollment';
import {google} from 'googleapis';
import userService from '../api-user/user.service';
import reviewService from '../api-reviews/review.service';
import emailService from '../../core/mailer/mail.service';
import senderType from '../../core/constants/sender-type';
import mailTemplateName from '../../core/constants/mail-template';
import BPromise from 'bluebird';
import get from 'lodash/get';
import oauth2Client from '../../core/google/oauth-client';
import isNil from 'lodash/isNil';
import assign from 'lodash/assign';

const constructWhere = async (userId, options) => {
  const {
    type,
    searchText,
    gradeFilter,
    categoryFilter,
    rangePrice,
    showFavorite
  } = options || {};
  const whereSearchPhrase = !searchText
    ? {}
    : {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchText}%`
            }
          }
        ]
      };

  if (gradeFilter) {
    try {
      const target =
        gradeFilter.split('-')[1] === 'primary'
          ? [1, 5]
          : gradeFilter.split('-')[1] === 'secondary'
          ? [6, 9]
          : gradeFilter.split('-')[1] === 'high'
          ? [10, 12]
          : [13, 13];

      if (gradeFilter && gradeFilter.split('-')[1] !== 'all') {
        if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
        whereSearchPhrase[Op.and].push({grade: {[Op.between]: target}});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (categoryFilter) {
    try {
      const category = await Category.findOne({
        where: {code: categoryFilter.split('-')[1]}
      });

      if (
        category &&
        categoryFilter &&
        categoryFilter.split('-')[1] !== 'all'
      ) {
        if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
        whereSearchPhrase[Op.and].push({categoryId: {[Op.eq]: category.id}});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (rangePrice > -1) {
    if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
    whereSearchPhrase[Op.and].push({
      price: {[Op.between]: [0, rangePrice]}
    });
  }

  if (showFavorite === 'true' && userId) {
    try {
      const favoriteCourseIdsArray = await getFavoriteCourseIdsOfUserId(userId);
      if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
      whereSearchPhrase[Op.and].push({
        id: {
          [Sequelize.Op.in]: favoriteCourseIdsArray
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  const isAdmin = await userService.validateUserHaveAdminPermissions(userId);
  if (!isAdmin && type !== 'teacher') {
    if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
    whereSearchPhrase[Op.and].push({
      isActive: true
    });
  }

  let where = whereSearchPhrase;
  switch (type) {
    case 'teacher':
      where = {
        ...where,
        ownerId: userId
      };
      break;
  }

  return where;
};

const getFavoriteCourseIdsOfUserId = async (userId) => {
  if (!userId) {
    return [];
  }

  const favoriteCourses = await Favorite.findAll({
    where: {userId},
    attributes: ['courseId'],
    raw: true
  });

  return favoriteCourses.map((favorite) => favorite.courseId);
};

const constructSort = (sortBy) => {
  switch (sortBy) {
    case 'sortby-name-a-z':
      return ['title', 'ASC'];
    case 'sortby-name-z-a':
      return ['title', 'DESC'];
    case 'sortby-price-lowest':
      return ['price', 'ASC'];
    case 'sortby-price-highest':
      return ['price', 'DESC'];
    default:
      return ['updatedAt', 'DESC'];
  }
};

const courseInclude = [
  {
    model: User,
    as: 'owner',
    attributes: ['id', 'firstName', 'lastName', 'avatar']
  },
  {
    model: Category,
    as: 'category',
    attributes: ['id', 'code', 'name', 'description']
  },
  {
    model: Subject,
    as: 'subject'
  }
];

const courseService = {
  getCourses: async (userId, options) => {
    const {
      q: searchPhrase,
      offset,
      limit,
      type,
      searchText = '',
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1,
      showFavorite = false
    } = options || {};

    try {
      const where = await constructWhere(userId, {
        searchPhrase,
        type,
        searchText,
        sortBy,
        gradeFilter,
        categoryFilter,
        rangePrice,
        showFavorite
      });

      return await Course.findAll({
        offset: offset || 0,
        limit: limit || 20,
        where,
        order: [constructSort(sortBy)],
        include: courseInclude,
        raw: true,
        nest: true
      });
    } catch (err) {
      console.error(err);
      throw 'error.getCourseFail';
    }
  },

  getFavoriteCourseIds: async (userId) => {
    const favoriteCourses = await getFavoriteCourseIdsOfUserId(userId);
    if (favoriteCourses.length !== 0) return favoriteCourses;
    else return null;
  },

  getCourseCount: async (userId, options) => {
    const {
      q: searchPhrase,
      type,
      searchText = '',
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1,
      showFavorite = false
    } = options || {};

    try {
      const where = await constructWhere(userId, {
        searchPhrase,
        type,
        searchText,
        sortBy,
        gradeFilter,
        categoryFilter,
        rangePrice,
        showFavorite
      });

      return await Course.count({where});
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  getCourseById: async (courseId) => {
    try {
      return await Course.findOne({
        where: {
          id: courseId
        },
        include: courseInclude,
        raw: true,
        nest: true
      });
    } catch (err) {
      console.error(err);
      throw 'error.getCourseFail';
    }
  },

  getCourseBySlug: async (slug) => {
    try {
      return await Course.findOne({
        where: {
          slug
        },
        include: courseInclude,
        raw: true,
        nest: true
      });
    } catch (err) {
      console.error(err);
      throw 'error.getCourseFail';
    }
  },

  createCourse: async (courseData) => {
    try {
      const createdCourse = await Course.create(courseData);

      return createdCourse;
    } catch (err) {
      console.error(err);
      throw 'error.createCourseFail';
    }
  },

  createEvent: async (userId, credentials, event, maxAttendees) => {
    try {
      oauth2Client.setCredentials(credentials);
      const calendar = google.calendar('v3');
      const response = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
        maxAttendees
      });

      return response?.data;
    } catch (err) {
      await User.update({googleTokens: null}, {where: {id: userId}});
      console.error(err);
      throw 'err.generateMeetLinkFail';
    }
  },

  updateAttendeeList: async (userId, credentials, eventId, attendees) => {
    try {
      oauth2Client.setCredentials(credentials);
      const calendar = google.calendar('v3');
      const event = await calendar.events.get({
        auth: oauth2Client,
        calendarId: 'primary',
        eventId
      });

      if (!event) {
        return null;
      }

      const response = await calendar.events.patch({
        auth: oauth2Client,
        calendarId: 'primary',
        eventId,
        requestBody: {attendees, status: 'confirmed'}
      });

      return response?.data;
    } catch (err) {
      // The error is most likely due to the user has revoke the access to Google Calendar
      // We can safely ignore it and prompt the teacher to refresh the attendee list
      await User.update({googleTokens: null}, {where: {id: userId}});
      console.error(err);
      return null;
    }
  },

  checkCourseValidity: async (ownerId, courseId) => {
    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return {status: 404, message: `Cannot find course with id ${courseId}`};
      }

      if (course.ownerId !== ownerId) {
        return {status: 403};
      }

      return null;
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const result = await Course.update(courseData, {
        where: {
          id: courseId
        },
        returning: true
      });

      return result[1];
    } catch (err) {
      console.error(err);
      throw 'error.updateCourseFail';
    }
  },

  deleteCourse: async (courseId) => {
    try {
      return await Course.destroy({
        where: {
          id: courseId
        }
      });
    } catch (err) {
      console.error(err);
      throw 'error.deleteCourseFail';
    }
  },

  enroll: async (courseId, userId) => {
    try {
      let enrollment = await Enrollment.findOne({where: {courseId, userId}});
      if (enrollment) {
        throw {
          status: 400,
          message: 'error.userReEnroll'
        };
      }

      return await Enrollment.create({courseId, userId});
    } catch (err) {
      console.error(err);
      throw err?.status && err?.message ? err : 'error.enrollCourseFail';
    }
  },

  getEnrolledStudents: async (courseId) => {
    try {
      return await Enrollment.findAll({
        where: {
          courseId
        },
        include: {
          model: User,
          required: true,
          attributes: [
            'id',
            'email',
            'firstName',
            'lastName',
            'dateOfBirth',
            'mobilePhone',
            'nationality'
          ]
        },
        raw: true,
        nest: true
      });
    } catch (err) {
      console.error(err);
      throw 'error.getEnrolledStudentsFail';
    }
  },

  getCreatedCourses: async (ownerId) => {
    try {
      const courses = await Course.findAll({
        where: {
          ownerId
        },
        raw: true
      });

      const courseEnrollments = await BPromise.all(
        courses.map(async (course) => {
          return courseService.getEnrolledStudents(course.id);
        })
      );

      const courseReviews = await BPromise.all(
        courses.map(async (course) => {
          const reviews = await reviewService.getCourseReviews(course.id);
          return {
            reviews,
            totalRate: reviewService.getCourseRate(reviews)
          };
        })
      );

      const results = courses.map((course, index) => {
        return assign(
          course,
          {students: courseEnrollments[index].length},
          {reviews: courseReviews[index].reviews},
          {rating: courseReviews[index].totalRate}
        );
      });

      return results;
    } catch (err) {
      console.error(err);
      throw 'error.getEnrolledStudentsFail';
    }
  },

  modifyAccess: async (courseId, isActive, options = {}) => {
    try {
      await Course.update(
        {
          isActive: isActive
        },
        {
          where: {id: courseId}
        }
      );

      const template = isActive
        ? mailTemplateName.courseActivate
        : mailTemplateName.courseDeactivate;
      const {courseInfo = {}} = options;
      const enrollments = await courseService.getEnrolledStudents(courseId);
      await BPromise.all(
        enrollments.map(async (enrollment) => {
          const user = get(enrollment, 'user', {});
          const mailData = {
            fullName: `${user.firstName} ${user.lastName}`,
            courseTitle: get(courseInfo, 'title', ''),
            teacherFullName: `${get(courseInfo, 'owner.firstName', '')} ${get(
              courseInfo,
              'owner.lastName',
              ''
            )}`
          };
          await emailService.sendMail(
            user.email,
            senderType.support,
            template.subject,
            template.path,
            mailData
          );
        })
      );
      return {status: 200, message: 'OK'};
    } catch (err) {
      return {status: 500, message: err.message};
    }
  },

  getCategories: async () => {
    return Category.findAll({});
  },

  getSubjects: async () => {
    return Subject.findAll({});
  },

  toggleFavorite: async (userId, courseId) => {
    const favorite = await Favorite.findOne({
      where: {
        userId,
        courseId
      }
    });

    if (isNil(favorite)) {
      await Favorite.create({
        userId,
        courseId
      });
    } else {
      await Favorite.destroy({
        where: {
          userId,
          courseId
        },
        force: true
      });
    }
  }
};

export default courseService;
