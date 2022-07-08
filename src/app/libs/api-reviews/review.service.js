import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import get from 'lodash/get';

import Course from '../../core/database/models/course';
import Review from '../../core/database/models/review';
import User from '../../core/database/models/user';

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
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'avatar', 'firstName', 'lastName'],
          require: true
        }
      ],
      raw: true,
      nest: true
    });

    return reviews;
  },

  submitCourseReviews: async (userId, courseId, reviewForm) => {
    try {
      const review = await Review.findOne({where: {courseId, userId}});

      if (!isNil(review)) {
        return {
          status: 400,
          message: 'error.alreadyReviewed'
        };
      }

      const {firstName, lastName, title, description, rate, timestamp} =
        reviewForm;
      const username = firstName + ' ' + lastName;

      return Review.create({
        userId,
        username,
        courseId,
        title,
        description,
        rate,
        timestamp
      });
    } catch (error) {
      return {
        status: 400,
        message: 'error.userNotFound'
      };
    }
  }
};

export default reviewService;
