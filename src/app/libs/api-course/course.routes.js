import express from 'express';
import courseController from './course.controller';
import mw from '../../core/middlewares';

const courseRouter = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     tags: ["Course"]
 *     summary: Get courses
 *     description: Get courses by search query, joined or created courses
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of courses to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of courses to return
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search query
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [teacher, student]
 *         description: |
 *           The type which determine whether to get courses by search query or:
 *           * `teacher` - courses created by teacher
 *           * `student` - courses joined by student
 *     responses:
 *       200:
 *         description: Return courses
 *       400:
 *         description: Unknown 'type' query
 */
courseRouter.get('/', courseController.getCourses);

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     tags: ["Course"]
 *     summary: Get a specific course by id
 *     description: Get a specific course by id
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The id of the course
 *     responses:
 *       200:
 *         description: Return specified course
 *       404:
 *         description: Course not found
 */
courseRouter.get('/:courseId', courseController.getSpecificCourse);

/**
 * @swagger
 * /courses:
 *   post:
 *     tags: ["Course"]
 *     summary: Initiate a course
 *     description: Initiate a course
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncompleteCourse'
 *     responses:
 *       201:
 *         description: Return newly created course
 *       400:
 *         description: Validation error
 *       404:
 *         description: Course not found
 */
courseRouter.post(
  '/',
  mw.courseValidator.incompleteCourseValidator,
  courseController.createCourse
);

/**
 * @swagger
 * /courses/{courseId}:
 *   put:
 *     tags: ["Course"]
 *     summary: Update a course
 *     description: Update a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The id of the course
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Return updated course
 *       400:
 *         description: Validation error
 *       404:
 *         description: Course not found
 */
courseRouter.put(
  '/:courseId',
  mw.courseValidator.completeCourseValidator,
  courseController.updateCourse
);

/**
 * @swagger
 * /courses/{courseId}:
 *   delete:
 *     tags: ["Course"]
 *     summary: Delete a course
 *     description: Delete a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The id of the course
 *     responses:
 *       204:
 *         description: Delete completed
 *       404:
 *         description: Course not found
 */
courseRouter.delete('/:courseId', courseController.deleteCourse);

export default courseRouter;
