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
courseRouter.get('/', mw.decideToVerify, courseController.getCourses);

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
courseRouter.get(
  '/:courseId',
  mw.decideToVerify,
  courseController.getSpecificCourse
);

/**
 * @swagger
 * /courses:
 *   post:
 *     tags: ["Course"]
 *     summary: Create a course
 *     description: Create a course
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseWithClasses'
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
  mw.verifyRequest,
  mw.courseValidator,
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
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Course not found
 */
courseRouter.put(
  '/:courseId',
  mw.verifyRequest,
  mw.courseValidator,
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
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Course not found
 */
courseRouter.delete(
  '/:courseId',
  mw.verifyRequest,
  courseController.deleteCourse
);

/**
 * @swagger
 * /courses/{courseId}/classes:
 *   get:
 *     tags: ["Course"]
 *     summary: Get classes of a course
 *     description: Get classes of a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The id of the course
 *     responses:
 *       200:
 *         description: Return classes of the specified course
 *       404:
 *         description: Course not found
 */
courseRouter.get('/:courseId/classes', courseController.getClasses);

/**
 * @swagger
 * /courses/{courseId}/classes:
 *   post:
 *     tags: ["Course"]
 *     summary: Create a class for a course
 *     description: Create a class for a course
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
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Return created class
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Course not found
 */
courseRouter.post('/:courseId/classes', courseController.createClass);

/**
 * @swagger
 * /courses/{courseId}/enrollments:
 *   get:
 *     tags: ["Course"]
 *     summary: Get enrollment of students of a course
 *     description: Get enrollment of students of a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The id of the course
 *     responses:
 *       200:
 *         description: Return enrollments group by class id of a course
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Course not found
 */
courseRouter.get(
  '/:courseId/enrollments',
  mw.verifyRequest,
  courseController.getCourseEnrollments
);

courseRouter.post('/enroll', mw.verifyRequest, courseController.enroll);

courseRouter.get(
  '/:courseId/enrolled-students',
  mw.verifyRequest,
  courseController.getEnrolledStudents
);

/**
 * @swagger
 * /courses/calendar/create-token:
 *   post:
 *     tags: ["Course"]
 *     summary: create token to create a calendar
 *     description: Create token to create a calendar
 *     parameters:
 *     responses:
 *       200:
 *         create token successful:
 */
courseRouter.post('/calendar/create-token', courseController.createTokens);

/**
 * @swagger
 * /courses/calendar/create-event:
 *   post:
 *     tags: ["Course"]
 *     summary: create event
 *     description: Create event
 *     parameters:
 *     responses:
 *       200:
 *         create event successfull:
 */
courseRouter.post('/calendar/create-event', courseController.createEvent);

export default courseRouter;
