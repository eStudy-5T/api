import courseService from './course.service.js';
import userService from '../api-user/user.service';
import helper from '../../utils/helper';
import get from 'lodash/get';
import isNull from 'lodash/isNull';
import enrollmentServices from '../api-enrollment/enrollment.service';
import User from '../../core/database/models/user';
import Course from '../../core/database/models/course.js';

const courseController = {
  getCourses: (req, res) => {
    const {type, userId} = req.query;

    if (![undefined, 'teacher', 'student'].includes(type)) {
      return res.status(400).send('Unknown type query');
    }
    Promise.all([
      courseService.getCourses(userId, {...req.query}),
      courseService.getCourseCount(userId, {...req.query})
    ])
      .then(([courses, count]) => {
        res.status(200).send({courses, count});
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getSpecificCourse: async (req, res) => {
    const {courseId} = req.params;
    const userId = get(req, 'user.id');

    try {
      const course = await courseService.getCourseById(courseId);
      if (!course) {
        return res.status(400).send('Course not found');
      }

      const isAdmin = await userService.validateUserHaveAdminPermissions(
        userId
      );
      if (!course.isActive && !isAdmin) {
        return res.status(400).send('This course is not available now!');
      }

      const enrollment = userId
        ? await enrollmentServices.getEnrollment(courseId, userId)
        : null;
      course.isEnrolled = enrollment ? true : false;

      const owner =
        course.ownerId === userId
          ? await User.findOne({
              where: {id: course.ownerId},
              raw: true
            })
          : null;
      course.isCreator = isNull(owner) ? false : true;
      res.status(200).send(course);
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  createCourse: (req, res) => {
    const {type, grade, classes} = req.body;
    const courseData = {
      ...req.body,
      ownerId: req.user.id
    };

    courseService
      .createCourse(courseData, classes)
      .then((createdCourse) => {
        res.status(201).send(createdCourse);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  updateCourse: (req, res) => {
    const {courseId} = req.params;
    const courseData = req.body;

    courseService
      .checkCourseValidity(req.user.id, courseId)
      .then((error) => {
        if (error) throw error;

        return courseService.updateCourse(courseId, courseData);
      })
      .then((updatedCourse) => {
        res.status(200).send(updatedCourse);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  deleteCourse: (req, res) => {
    const {courseId} = req.params;

    courseService
      .checkCourseValidity(req.user.id, courseId)
      .then((error) => {
        if (error) throw error;

        return courseService.deleteCourse(courseId);
      })
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  createTokens: async (req, res) => {
    const {code} = req.body;

    courseService
      .createTokens(code)
      .then((tokens) => {
        res.status(200).send(tokens);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  enroll: async (req, res) => {
    const courseId = get(req, 'body.courseId');
    const ownerId = get(req, 'body.ownerId');
    const userId = get(req, 'user.id');

    try {
      const error = await courseService.checkCourseValidity(ownerId, courseId);
      if (error) throw error;

      if (!ownerId) {
        res.status(400).send('ownerId is missing!');
      }

      if (userId === ownerId) {
        res.status(400).send('error.teacherEnrollCourse');
      }

      const course = await Course.findByPk(courseId);
      if (!course) {
        res.status(400).send('error.courseNotFound');
      }

      if (!course.isActive) {
        res.status(400).send('This course is not available now!');
      }

      const {
        enrollment = {},
        status,
        message
      } = await courseService.enroll(courseId, userId);
      if (status === 200) {
        res.status(200).send(enrollment);
      } else {
        res.status(status).send(message);
      }
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  getEnrolledStudents: async (req, res) => {
    const {courseId} = req.params;

    try {
      const enrolledList = await courseService.getEnrolledStudents(courseId);
      res.status(200).send(enrolledList);
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  createEvent: async (req, res) => {
    const {summary, description, location, startDateTime, endDateTime} =
      req.body;

    const attendeesEmails = [
      {email: 'user1@example.com'},
      {email: 'user2@example.com'}
    ]; //attendeesEmails: email addresses of students who enroll in this class;

    const event = {
      summary: summary,
      description: description,
      colorId: '7',
      location: location,
      start: {
        dateTime: new Date(startDateTime)
      },
      end: {
        dateTime: new Date(endDateTime)
      },
      attendees: attendeesEmails,
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10}
        ]
      },
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          },
          requestId: 'coding-calendar-demo'
        }
      }
    };

    //refresh token will be save at DB of course.
    const refreshToken =
      '1//0gw120ZLIBqPACgYIARAAGBASNwF-L9IrPDvm216HwX_VwI4Z5HTVeEljZf7mtstF7piusobwZhyWyTFPCbEu1rX1mhyS1VnWYwU';

    courseService
      .createEvent(refreshToken, event)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getCreatedCourses: async (req, res) => {
    const {ownerId} = req.params;

    try {
      const createdCourses = await courseService.getCreatedCourses(ownerId);
      res.status(200).send(createdCourses);
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  activate: async (req, res) => {
    const {courseId} = req.params;
    const userId = get(req, 'user.id', '');

    try {
      const isAdmin = await userService.validateUserHaveAdminPermissions(
        userId
      );
      if (!isAdmin) {
        res.status(400).send('error.notAdmin');
      }

      const course = await courseService.getCourseById(courseId);
      if (!course) {
        return res.status(400).send('Course not found');
      }

      if (course.isActive) {
        return res.status(400).send('Course has been already activated!');
      }

      const {status = 500, message = 'Internal Error'} =
        await courseService.modifyAccess(courseId, true, {courseInfo: course});

      if (status === 200) {
        res.status(200).send('OK');
      } else {
        res.status(status).send(message);
      }
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  deactivate: async (req, res) => {
    const {courseId} = req.params;
    const userId = get(req, 'user.id', '');

    try {
      const isAdmin = await userService.validateUserHaveAdminPermissions(
        userId
      );
      if (!isAdmin) {
        return res.status(400).send('error.notAdmin');
      }

      const course = await courseService.getCourseById(courseId);
      if (!course) {
        return res.status(400).send('Course not found');
      }

      if (!course.isActive) {
        return res.status(400).send('Course has been already deactivated!');
      }

      const {status = 500, message = 'Internal Error'} =
        await courseService.modifyAccess(courseId, false, {courseInfo: course});

      if (status === 200) {
        return res.status(200).send('OK');
      } else {
        return res.status(status).send(message);
      }
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  getCategories: async (req, res) => {
    courseService
      .getCategories()
      .then((categories) => {
        res.status(200).send(categories);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getSubjects: async (req, res) => {
    courseService
      .getSubjects()
      .then((subjects) => {
        res.status(200).send(subjects);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default courseController;
