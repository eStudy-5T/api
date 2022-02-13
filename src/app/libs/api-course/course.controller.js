import courseService from './course.service.js';
import helper from '../../utils/helper';

const getCourses = async (req, res) => {
  const {q, offset, limit, type} = req.query;
  const pagination = {
    offset: offset || 0,
    limit: limit || 15
  };

  const options = {...pagination, order: [['updatedAt', 'DESC']]};

  try {
    let courses;

    switch (type) {
      case undefined:
      case null:
        courses = await courseService.getCourses(options, q);
        break;

      case 'teacher':
        options.where = {
          ownerId: req.user.id
        };

        courses = await courseService.getCourses(options);
        break;

      default:
        return res.status(400).send('Unknown type query');
    }

    res.status(200).send(courses);
  } catch (err) {
    helper.apiHandler.handleErrorResponse(res, err);
  }
};

const getSpecificCourse = async (req, res) => {
  const {courseId} = req.params;

  try {
    const course = await courseService.getSpecificCourse(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    res.status(200).send(course);
  } catch (err) {
    helper.apiHandler.handleErrorResponse(res, err);
  }
};

const createCourse = async (req, res) => {
  const {title, type} = req.body;
  const courseData = {
    title,
    ownerId: req.user.id,
    typeId: type || 1
  };

  try {
    const createdCourse = await courseService.createCourse(courseData);

    res.status(201).send(createdCourse);
  } catch (err) {
    helper.apiHandler.handleErrorResponse(res, err);
  }
};

const updateCourse = async (req, res) => {
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

  try {
    const courses = await courseService.getCourses({
      where: {
        id: courseId,
        ownerId: req.user.id
      }
    });
    if (!courses.length) {
      return res.status(404).send('Course not found');
    }

    const updatedCourse = await courseService.updateCourse(
      courseId,
      courseData
    );

    res.status(200).send(updatedCourse);
  } catch (err) {
    helper.apiHandler.handleErrorResponse(res, err);
  }
};

const deleteCourse = async (req, res) => {
  const {courseId} = req.params;

  try {
    const courses = await courseService.getCourses({
      where: {
        id: courseId,
        ownerId: req.user.id
      }
    });
    if (!courses.length) {
      return res.status(404).send('Course not found');
    }

    await courseService.deleteCourse(courseId);

    res.status(204).end();
  } catch (err) {
    helper.apiHandler.handleErrorResponse(res, err);
  }
};

export default {
  getCourses,
  getSpecificCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
