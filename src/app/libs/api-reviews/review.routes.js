import express from 'express';
import reviewController from './review.controller';
import mw from '../../core/middlewares';

const reviewRouter = express.Router();

/**
 * @swagger
 * /reviews/:courseId:
 *   get:
 *     tags: ["Course Reviews"]
 *     summary: Get reviews of specific course
 *     description: Get reviews of specific course
 *     responses:
 *       200:
 *         description: Return course's reviews
 *       400:
 *         description: Course not found
 */
reviewRouter.get('/:courseId', reviewController.getCourseReviews);

/**
 * @swagger
 * /reviews/:courseId:
 *   post:
 *     tags: ["Course Reviews"]
 *     summary: Submit a reviews for specific course
 *     description: Submit a reviews for specific course
 *     responses:
 *       200:
 *         description: Return course's reviews
 *       400:
 *         description: Cannot submit review for course
 */
reviewRouter.post(
  '/:courseId',
  mw.verifyRequest,
  reviewController.submitCourseReviews
);

export default reviewRouter;
