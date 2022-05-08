import {Op} from 'sequelize';
import Course from '../../core/database/models/course';
import Class from '../../core/database/models/class';
import User from '../../core/database/models/user';
import Category from '../../core/database/models/category';
import Grade from '../../core/database/models/grade';
import Enrollment from '../../core/database/models/enrollment';
import {google} from 'googleapis';

const clientID =
  '923429314852-valb33asnb7ula24v5f8cfr7a3btmegn.apps.googleusercontent.com';
const clientSecret = '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';

const oauth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  'http://localhost:3000'
);

const constructWhere = async (userId, options) => {
  const {type, searchText, categoryFilter, gradeFilter, rangePrice} =
    options || {};
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

      const grade = await Grade.findOne({
        where: {id: {[Op.between]: target}}
      });

      if (grade && gradeFilter && gradeFilter.split('-')[1] !== 'all') {
        if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
        whereSearchPhrase[Op.and].push({gradeId: {[Op.between]: target}});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (rangePrice > -1) {
    if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
    whereSearchPhrase[Op.and].push({
      price: {[Op.between]: [0, rangePrice * 1000]}
    });
  }

  let where = whereSearchPhrase;
  switch (type) {
    case 'teacher':
      where = {
        ...where,
        ownerId: userId
      };
  }

  return where;
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
      rangePrice = -1
    } = options || {};
    const where = await constructWhere(userId, {
      searchPhrase,
      type,
      searchText,
      sortBy,
      categoryFilter,
      gradeFilter,
      rangePrice
    });

    try {
      return await Course.findAll({
        offset: offset || 0,
        limit: limit || 20,
        where,
        order: [constructSort(sortBy)],
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['firstName', 'lastName', 'avatar']
          },
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'code', 'name', 'description']
          }
        ]
      });
    } catch (err) {
      console.error(err);
      throw 'error.getCourseFail';
    }
  },

  getCourseCount: async (userId, options) => {
    const {
      q: searchPhrase,
      type,
      searchText = '',
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1
    } = options || {};

    const where = await constructWhere(userId, {
      searchPhrase,
      type,
      searchText,
      sortBy,
      categoryFilter,
      gradeFilter,
      rangePrice
    });

    try {
      return await Course.count({where});
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  getCourseById: async (courseId) => {
    try {
      return await Course.findByPk(courseId);
    } catch (err) {
      console.error(err);
      throw 'error.getCourseFail';
    }
  },

  createCourse: async (courseData, classes) => {
    try {
      const createdCourse = await Course.create(courseData);

      if (classes?.length) {
        await Class.bulkCreate(
          classes.map((c) => ({...c, courseId: createdCourse.id}))
        );
      }

      return createdCourse;
    } catch (err) {
      console.error(err);
      throw 'error.createCourseFail';
    }
  },

  createTokens: async (code) => {
    try {
      const tokens = await oauth2Client.getToken(code);
      return tokens;
    } catch (err) {
      console.error(err);
      throw 'error.createTokensFail';
    }
  },

  createEvent: async (refreshToken, event) => {
    try {
      oauth2Client.setCredentials({refresh_token: refreshToken});
      const calendar = google.calendar('v3');
      const response = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1
      });

      return response;
    } catch (err) {
      console.error(err);
      throw 'err.createEventFail';
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
      return Enrollment.create({courseId, userId});
    } catch (err) {
      console.error(err);
      throw 'error.enrollCourseFail';
    }
  },

  getEnrollments: async (courseId) => {
    try {
      return Enrollment.findOne({
        where: {
          courseId: 'courseId'
        },
        raw: true
      });
    } catch (err) {
      console.log(err);
      throw 'error.getCourseEnrollments';
    }
  }
};

export default courseService;
