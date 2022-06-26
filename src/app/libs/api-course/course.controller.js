import courseService from './course.service.js';
import userService from '../api-user/user.service';
import helper from '../../utils/helper';
import get from 'lodash/get';
import enrollmentService from '../api-enrollment/enrollment.service';
import User from '../../core/database/models/user';
import tokenService from '../api-auth/token.service.js';
import {validate as uuidValidate} from 'uuid';

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
      const course = await courseService.getCourseById(courseId);
      if (!course) {
        return res.status(400).send('error.courseNotFound');
      }
      if (Number(course.price) !== 0) {
        return res.status(400).send('This course is not free!');
      }
      if (userId === course.ownerId) {
        return res.status(400).send('error.teacherEnrollCourse');
      }
      if (!course.isActive) {
        return res.status(400).send('This course is not available now!');
      }

      const enrollment = await courseService.enroll(courseId, userId);

      const credentials = await userService.getGoogleTokens(course.ownerId);
      if (credentials && course.eventId) {
        const enrollments = await enrollmentService.getEnrollments(courseId);
        await courseService.updateAttendeeList(
          course.ownerId,
          credentials,
          course.eventId,
          enrollments.map((e) => ({email: e.email}))
        );
      }

      res.status(200).send(enrollment);
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  checkout: (req, res) => {
    const {courseId} = req.params;
    const {createDate, locale} = req.query;
    const userId = req.user.id;
    let tempCourse;

    courseService
      .getCourseById(courseId)
      .then((course) => {
        if (!course) {
          throw {status: 400, message: 'error.courseNotFound'};
        }
        if (course.ownerId === userId) {
          throw {status: 400, message: 'error.teacherEnrollCourse'};
        }
        if (!course.isActive) {
          throw {status: 400, message: 'This course is not available now!'};
        }

        tempCourse = course;
        return enrollmentService.getSpecificEnrollment(courseId, userId);
      })
      .then((enrollment) => {
        if (enrollment) {
          throw {status: 400, message: 'error.userReEnroll'};
        }

        return userService.getCurrentUser(userId);
      })
      .then((user) => {
        const checkoutUrl = helper.vnPay.generateCheckoutUrl({
          price: Number(tempCourse.price),
          createDate,
          ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          locale,
          currency: tempCourse.currency,
          studentName: `${user.firstName} ${user.lastName}`,
          courseName: tempCourse.title,
          courseId,
          studentId: userId
        });

        res.status(200).send({checkoutUrl});
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  enrollThroughVnPay: async (req, res) => {
    const queries = req.query;
    const [courseId, userId] = queries['vnp_TxnRef']?.split('_') || [];
    const secureHash = queries['vnp_SecureHash'];
    const responseCode = queries['vnp_ResponseCode'];

    delete queries['vnp_SecureHash'];
    delete queries['vnp_SecureHashType'];

    const signed = helper.vnPay.generateChecksum(queries, true);
    if (secureHash !== signed) {
      return res.status(200).send({RspCode: '97', Message: 'Invalid Checksum'});
    }
    if (responseCode === '99') {
      return res.status(200).send({RspCode: '00', Message: 'Confirm Success'});
    }

    try {
      const course =
        uuidValidate(courseId) && (await courseService.getCourseById(courseId));
      const user =
        uuidValidate(courseId) && (await userService.getCurrentUser(userId));

      if (!course || !user) {
        return res
          .status(200)
          .send({RspCode: '01', Message: 'Order Not Found'});
      }
      if (Number(queries['vnp_Amount']) !== Number(course.price) * 100) {
        return res.status(200).send({RspCode: '04', Message: 'Invalid amount'});
      }

      const enrollment = await enrollmentService.getSpecificEnrollment(
        courseId,
        userId
      );
      if (enrollment) {
        return res
          .status(200)
          .send({RspCode: '02', Message: 'Order already confirmed'});
      }

      await courseService.enroll(courseId, userId);

      const credentials = await userService.getGoogleTokens(course.ownerId);
      if (credentials && course.eventId) {
        const enrollments = await enrollmentService.getEnrollments(courseId);
        await courseService.updateAttendeeList(
          course.ownerId,
          credentials,
          course.eventId,
          enrollments.map((e) => ({email: e.email}))
        );
      }

      res.status(200).send({RspCode: '00', Message: 'Confirm Success'});
    } catch (err) {
      console.log('err:', err);
      res.status(200).send({RspCode: '99', Message: 'Internal Server Error'});
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
    let credentials;
    let attendeesEmails = []; //attendeesEmails: email addresses of students who enroll in this course;

    userService
      .getGoogleTokens(req.user.id)
      .then((googleTokens) => {
        if (!googleTokens) {
          return res.status(500).send('error.googleCredentialsExpired');
        }

        credentials = googleTokens;
        return courseService.checkCourseValidity(req.user.id, courseId);
      })
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
          req.user.id,
          credentials,
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

  refreshAttendeeList: (req, res) => {
    const {courseId} = req.params;

    let tempCourse;
    let credentials;
    userService
      .getGoogleTokens(req.user.id)
      .then((googleTokens) => {
        if (!googleTokens) {
          return res.status(500).send('error.googleCredentialsExpired');
        }

        credentials = googleTokens;
        return courseService.checkCourseValidity(req.user.id, courseId);
      })
      .then((err) => {
        if (err) {
          throw err;
        }

        return courseService.getCourseById(courseId);
      })
      .then((course) => {
        tempCourse = course;

        return enrollmentService.getEnrollments(courseId);
      })
      .then((enrollments) => {
        const attendeesEmails = enrollments.map((e) => ({
          email: e.email
        }));

        return courseService.updateAttendeeList(
          req.user.id,
          credentials,
          tempCourse.eventId,
          attendeesEmails
        );
      })
      .then(() => {
        res.status(200).send();
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
