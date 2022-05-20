import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import get from 'lodash/get';

import Course from '../../core/database/models/course';
import Review from '../../core/database/models/review';
import courseService from '../api-course/course.service';

const reviewService = {
  getCourseRate: (reviews = []) => {
    return reviews
      .reduce((avg, review, _, {length}) => {
        return avg + get(review, 'rate', 0) / length;
      }, 0)
      .toFixed(1);
  },

  getCourseReviews: async (courseId) => {
    let course = {};
    try {
      course = await Course.findOne({where: {id: courseId}});
      if (isEmpty(course)) {
        return {
          status: 400,
          message: 'error.courseNotFound'
        };
      }
    } catch (err) {
      return {
        status: 400,
        message: 'error.courseNotFound'
      };
    }

    const reviews = Review.findAll({
      where: {courseId},
      raw: true
    });

    return reviews;
  },

  submitCourseReviews: async (userId, courseId, reviewForm) => {
    const review = await Review.findOne({where: {courseId, userId}});
    console.log(review);
    if (!isNil(review)) {
      return {
        status: 400,
        message: 'error.alreadyReviewed'
      };
    }

    const {title, description, rate, timestamp} = reviewForm;
    return Review.create({
      userId,
      courseId,
      title,
      description,
      rate,
      timestamp
    });
  }
};

export default reviewService;
