import isInteger from 'lodash/isInteger';
import isEmpty from 'lodash/isEmpty';

import reviewService from '../api-reviews/review.service';

const uuidRegexExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function _isValidTimestamp(timestamp) {
  return new Date(timestamp).getTime() > 0;
}

const reviewController = {
  getCourseReviews: async (req, res) => {
    const {courseId} = req.params;
    if (!uuidRegexExp.test(courseId)) {
      return res.status(400).send('Course ID is not valid');
    }

    const reviews = await reviewService.getCourseReviews(courseId);
    const {status, message} = reviews;
    if (status === 400) {
      return res.status(400).send(message);
    }

    const result = {
      count: reviews.length,
      rating: reviewService.getCourseRate(reviews),
      data: reviews
    };
    return res.status(201).send(result);
  },

  submitCourseReviews: async (req, res) => {
    const {courseId} = req.params;
    if (!uuidRegexExp.test(courseId)) {
      return res.status(400).send('Course ID is not valid');
    }

    const reviewForm = req.body;
    const {rate = 0, title = '', description = '', timestamp = ''} = reviewForm;
    if (!isInteger(rate) || rate <= 0) {
      return res.status(400).send('Ratings invalid');
    }
    if (isEmpty(title) || title.trim().length < 8) {
      return res.status(400).send('Title must be longer than 8 letters');
    }
    if (isEmpty(description) || description.trim().length < 8) {
      return res.status(400).send('Description must be longer than 8 letters');
    }
    if (!timestamp || !_isValidTimestamp(timestamp)) {
      return res.status(400).send('Timestamp is not valid');
    }

    const userId = req.user.id;
    const review = await reviewService.submitCourseReviews(
      userId,
      courseId,
      reviewForm
    );
    const {status = 500, message = 'Internal Error'} = review;
    if (status === 400) {
      return res.status(400).send(message);
    }
    return res.status(201).send(review);
  }
};

export default reviewController;
