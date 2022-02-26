import courseService from './course.service.js';
import helper from '../../utils/helper';

const courseController = {
  getCourses: (req, res) => {
    const {q, offset, limit, type} = req.query;
    const pagination = {
      offset: offset || 0,
      limit: limit || 15
    };

    const options = {...pagination, order: [['updatedAt', 'DESC']]};

    let coursesPromise;
    switch (type) {
      case undefined:
      case null:
        coursesPromise = courseService.getCourses(options, q);
        break;

      case 'teacher':
        options.where = {
          ownerId: req.user.id
        };
        coursesPromise = courseService.getCourses(options);
        break;

      default:
        return res.status(400).send('Unknown type query');
    }

    coursesPromise
      .then((courses) => {
        res.status(200).send(courses);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getSpecificCourse: (req, res) => {
    const {courseId} = req.params;

    courseService
      .getSpecificCourse({
        where: {
          id: courseId
        }
      })
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
    const {title, type} = req.body;
    const courseData = {
      title,
      ownerId: req.user.id,
      typeId: type || 1
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
    const {title, description, rating, price, outline, isOpened, grade} =
      req.body;
    const courseData = {
      title,
      description,
      rating,
      price,
      outline,
      isOpened,
      gradeId: grade
    };

    courseService
      .getSpecificCourse({
        where: {
          id: courseId,
          ownerId: req.user.id
        }
      })
      .then((course) => {
        if (!course) {
          return res.status(404).send('Course not found');
        }

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
      .getSpecificCourse({
        where: {
          id: courseId,
          ownerId: req.user.id
        }
      })
      .then((course) => {
        if (!course) {
          return res.status(404).send('Course not found');
        }

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
      .getClasses(courseId)
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
      .createClass(courseId, req.body)
      .then((createdClass) => {
        res.status(201).send(createdClass);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default courseController;
