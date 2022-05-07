import courseService from './course.service.js';
import classService from '../api-class/class.service';
import helper from '../../utils/helper';
import _ from 'lodash';

const courseController = {
  getCourses: (req, res) => {
    const {type} = req.query;

    if (![undefined, 'teacher', 'student'].includes(type)) {
      return res.status(400).send('Unknown type query');
    }
    Promise.all([
      courseService.getCourses(req.user.id, {...req.query}),
      courseService.getCourseCount(req.user.id, {...req.query})
    ])
      .then(([courses, count]) => {
        res.status(200).send({courses, count});
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getSpecificCourse: (req, res) => {
    const {courseId} = req.params;

    courseService
      .getCourseById(courseId)
      .then((course) => {
        if (!course) {
          return res.status(404).send('Course not found');
        }

        res.status(200).send(course);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
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
  }
};

export default courseController;
