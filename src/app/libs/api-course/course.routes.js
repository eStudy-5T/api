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

courseRouter.get('/categories', courseController.getCategories);

courseRouter.get('/subjects', courseController.getSubjects);

courseRouter.get('/enroll-through-vnpay', courseController.enrollThroughVnPay);

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

courseRouter.get(
  '/slug/:slug',
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
  // mw.courseValidator,
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

courseRouter.get(
  '/created-courses/:ownerId',
  mw.verifyRequest,
  courseController.getCreatedCourses
);

courseRouter.post(
  '/:courseId/enroll',
  mw.verifyRequest,
  courseController.enroll
);

courseRouter.post(
  '/:courseId/checkout',
  mw.verifyRequest,
  courseController.checkout
);

courseRouter.get(
  '/:courseId/enrolled-students',
  mw.verifyRequest,
  courseController.getEnrolledStudents
);

courseRouter.post(
  '/:courseId/generate-meet-link',
  mw.verifyRequest,
  courseController.generateMeetLink
);

courseRouter.post(
  '/:courseId/refresh-attendee-list',
  mw.verifyRequest,
  courseController.refreshAttendeeList
);

/**
 * @swagger
 * /courses/:courseId/active:
 *   post:
 *     tags: ["Course"]
 *     summary: Activate a course
 *     description: Activate a course
 *     parameters:
 *     responses:
 *       200: Activate a course successfully!
 */
courseRouter.post(
  '/:courseId/active',
  mw.verifyRequest,
  courseController.activate
);

/**
 * @swagger
 * /courses/:courseId/active:
 *   post:
 *     tags: ["Course"]
 *     summary: Deactivate a course
 *     description: Deactivate a course
 *     parameters:
 *     responses:
 *       200: Deactivate a course successfully!
 */
courseRouter.post(
  '/:courseId/deactive',
  mw.verifyRequest,
  courseController.deactivate
);

export default courseRouter;
