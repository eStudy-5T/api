import courseService from './course.service.js';
import userService from '../api-user/user.service';
import helper from '../../utils/helper';
import get from 'lodash/get';
import enrollmentService from '../api-enrollment/enrollment.service';
import User from '../../core/database/models/user';
import Course from '../../core/database/models/course.js';
import tokenService from '../api-auth/token.service.js';

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
    const {courseId, slug} = req.params;
    const userId = get(req, 'user.id');

    try {
      let course;
      switch (true) {
        case Boolean(courseId):
          course = await courseService.getCourseById(courseId);
          break;

        case Boolean(slug):
          course = await courseService.getCourseBySlug(slug);
          break;
      }
      if (!course) {
        return res.status(400).send('Course not found');
      }

      const owner =
        course.ownerId === userId
          ? await User.findOne({
              where: {id: course.ownerId},
              raw: true
            })
          : null;

      if (!owner) {
        const isAdmin = await userService.validateUserHaveAdminPermissions(
          userId
        );
        if (!course.isActive && !isAdmin) {
          return res.status(400).send('This course is not available now!');
        }
      }

      if (courseId) {
        const enrollment = userId
          ? await enrollmentService.getSpecificEnrollment(courseId, userId)
          : null;
        course.isEnrolled = Boolean(enrollment);
      }

      course.isCreator = Boolean(owner);
      res.status(200).send(course);
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  createCourse: (req, res) => {
    const courseData = {
      ...req.body,
      ownerId: req.user.id
    };

    courseService
      .createCourse(courseData)
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

  enroll: async (req, res) => {
    const {courseId} = req.params;
    const userId = get(req, 'user.id');

    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(400).send('error.courseNotFound');
      }

      if (userId === course.ownerId) {
        return res.status(400).send('error.teacherEnrollCourse');
      }

      // if (!course.isActive) {
      //   return res.status(400).send('This course is not available now!');
      // }

      const enrollment = await courseService.enroll(courseId, userId);

      const enrollments = await enrollmentService.getEnrollments(courseId);
      if (course.eventId) {
        await courseService.updateAttendeeList(
          course.eventId,
          enrollments.map((e) => ({email: e.email}))
        );
      }

      res.status(200).send(enrollment);
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

  generateMeetLink: async (req, res) => {
    const {courseId} = req.params;

    let tempCourse;
    let attendeesEmails = []; //attendeesEmails: email addresses of students who enroll in this class;

    courseService
      .checkCourseValidity(req.user.id, courseId)
      .then((err) => {
        if (err) {
          throw err;
        }

        return courseService.getCourseById(courseId);
      })
      .then((course) => {
        if (course.link && course.eventId) {
          res.status(400).send('error.alreadyGeneratedMeetLink');
        }
        tempCourse = course;

        return enrollmentService.getEnrollments(courseId);
      })
      .then((enrollments) => {
        attendeesEmails = enrollments.map((e) => ({
          email: e.email
        }));

        return tokenService.generateCryptoToken();
      })
      .then((randomizedString) => {
        const event = {
          summary: tempCourse.title,
          colorId: '7',
          start: {
            dateTime: new Date(tempCourse.startDate)
          },
          end: {
            dateTime: new Date(tempCourse.endDate)
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
              requestId: randomizedString
            }
          }
        };

        return courseService.createEvent(
          event,
          tempCourse.maxStudentNumber + 2
        );
      })
      .then(({id: eventId, hangoutLink: link}) => {
        return courseService.updateCourse(courseId, {eventId, link});
      })
      .then((updatedCourse) => {
        res.status(200).send(updatedCourse);
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
