import Joi from 'joi';
import courseService from '../../libs/api-course/course.service';
import appHelper from '../../utils/helper';
import COURSE_TYPE from '../constants/course-type';

const titleValidationSchema = Joi.object({
  title: Joi.string().required().min(10).max(100)
})
  .external((object) => {
    return new Promise((resolve, reject) => {
      courseService
        .getCourses(object.ownerId, {
          type: 'teacher'
        })
        .then((courses) => {
          const sameTitleCourse = courses?.find(
            (c) => c.title.toLowerCase() === object.title.toLowerCase()
          );
          if (sameTitleCourse && sameTitleCourse.id !== object.id) {
            return reject(
              new Error('The course with the same "title" already exists.')
            );
          }

          resolve(object);
        })
        .catch((err) => {
          console.error(err);
          reject(new Error('Internal server error'));
        });
    });
  })
  .unknown();

const courseValidationSchema = Joi.object({
  type: Joi.string()
    .required()
    .external((value) => {
      if (COURSE_TYPE[value]) {
        return value;
      }

      throw new Error('The provided course "type" does not exist.');
    }),
  description: Joi.string().allow('').max(255),
  rating: Joi.number().min(0).max(5),
  price: Joi.number().min(0),
  outline: Joi.string().min(0).max(255),
  isOpened: Joi.boolean(),
  grade: Joi.number().external((value) => {
    if (Array.from({length: 13}, (_, i) => i + 1).includes(value)) {
      return value;
    }

    throw new Error('The provided "grade" does not exist.');
  })
})
  .concat(titleValidationSchema)
  .unknown();

const courseValidator = (req, res, next) => {
  courseValidationSchema
    .validateAsync({
      ...req.body,
      ownerId: req.user.id,
      id: req.params.courseId
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      appHelper.apiHandler.handleValidationErrorResponse(res, err);
    });
};

export default courseValidator;
