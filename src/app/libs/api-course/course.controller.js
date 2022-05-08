import courseService from './course.service.js';
import classService from '../api-class/class.service';
import helper from '../../utils/helper';
import _ from 'lodash';
import enrollmentServices from '../api-enrollment/enrollment.service';

const courseController = {
  getCourses: (req, res) => {
    const {type} = req.query;

    if (![undefined, 'teacher', 'student'].includes(type)) {
      return res.status(400).send('Unknown type query');
    }
    Promise.all([
      courseService.getCourses(req?.user?.id, {...req.query}),
      courseService.getCourseCount(req?.user?.id, {...req.query})
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
    const userId = _.get(req, 'user.id');

    try {
      const course = await courseService.getCourseById(courseId);
      if (!course) {
        return res.status(404).send('Course not found');
      }

      const enrollment = userId
        ? enrollmentServices.getEnrollment(courseId, userId)
        : null;
      course.isEnrolled = enrollment ? true : false;
      res.status(200).send(course);
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  createCourse: (req, res) => {
    const {type, grade, classes} = req.body;
    const courseData = {
      ...req.body,
      ownerId: req.user.id,
      typeId: type,
      gradeId: grade
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
    const {type, grade} = req.body;
    const courseData = {
      ...req.body,
      typeId: type,
      gradeId: grade
    };

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

  getClasses: (req, res) => {
    const {courseId} = req.params;

    courseService
      .getCourseById(courseId)
      .then((course) => {
        if (!course) {
          return res.sendStatus(404);
        }

        return classService.getClassesByCourseId(courseId);
      })
      .then((classes) => {
        res.status(200).send(classes);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  createClass: (req, res) => {
    const {courseId} = req.params;

    courseService
      .checkCourseValidity(req.user.id, courseId)
      .then((error) => {
        if (error) throw error;

        return classService.createClass(courseId, req.body);
      })
      .then((createdClass) => {
        res.status(201).send(createdClass);
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

  getCourseEnrollments: (req, res) => {
    const {courseId} = req.params;

    courseService
      .checkCourseValidity(req.user.id, courseId)
      .then((error) => {
        if (error) throw error;

        return classService.getClassesByCourseId(courseId);
      })
      .then((classes) => {
        return classService.getClassEnrollments(
          courseId,
          classes.map((c) => c.id)
        );
      })
      .then((enrollments) => {
        const enrollmentsGroupByClass = _(enrollments).value();
        res.status(200).send(enrollmentsGroupByClass);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  enroll: async (req, res) => {
    const courseId = _.get(req, 'body.courseId');
    const ownerId = _.get(req, 'body.ownerId');
    const userId = _.get(req, 'user.id');

    try {
      const error = await courseService.checkCourseValidity(ownerId, courseId);
      if (error) throw error;

      const enrollment = await courseService.enroll(courseId, userId);
      res.status(200).send(enrollment);
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
  }
};

export default courseController;
