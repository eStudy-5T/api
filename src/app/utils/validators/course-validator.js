import Joi from 'joi';
import courseService from '../../libs/api-course/course.service';
import CourseType from '../../core/database/models/course-type';
import Grade from '../../core/database/models/grade';
import appHelper from '../helper';

const titleValidationSchema = Joi.object({
  title: Joi.string().required().min(10).max(100)
})
  .external((object) => {
    return new Promise((resolve, reject) => {
      courseService
        .getCourses({
          where: {
            ownerId: object.ownerId
          }
        })
        .then((courses) => {
          const sameTitleCourse = courses?.find(
            (c) => c.title.toLowerCase() === object.title.toLowerCase()
          );
          console.log();
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

const incompleteCourseValidationSchema = Joi.object({
  title: Joi.string().required().min(10).max(100),
  type: Joi.number()
    .required()
    .external((value) => {
      return new Promise((resolve, reject) => {
        CourseType.findByPk(value)
          .then((courseType) => {
            if (courseType) {
              return resolve(value);
            }

            reject(new Error('The provided course "type" does not exist.'));
          })
          .catch((err) => {
            console.error(err);
            reject(new Error('Internal server error'));
          });
      });
    })
})
  .concat(titleValidationSchema)
  .unknown();

const courseValidationSchema = Joi.object({
  description: Joi.string().min(10).max(255),
  rating: Joi.number().min(0).max(5),
  price: Joi.number().min(0),
  outline: Joi.string().min(0).max(255),
  isOpened: Joi.boolean(),
  grade: Joi.number().external((value) => {
    return new Promise((resolve, reject) => {
      Grade.findByPk(value)
        .then((grade) => {
          if (grade) {
            return resolve(value);
          }

          reject(new Error('The provided "grade" does not exist.'));
        })
        .catch((err) => {
          console.error(err);
          reject(new Error('Internal server error'));
        });
    });
  })
})
  .concat(titleValidationSchema)
  .unknown();

const incompleteCourseValidator = (req, res, next) => {
  incompleteCourseValidationSchema
    .validateAsync({
      ...req.body,
      ownerId: req.user.id
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      appHelper.apiHandler.handleValidationErrorResponse(res, err);
    });
};

const completeCourseValidator = (req, res, next) => {
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

export default {
  incompleteCourseValidator,
  completeCourseValidator
};
