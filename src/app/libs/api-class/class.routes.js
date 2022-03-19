import express from 'express';
import classController from './class.controller';

const classRouter = express.Router();

/**
 * @swagger
 * /classes/{classId}:
 *   get:
 *     tags: ["Class"]
 *     summary: Get a specific class
 *     description: Get a specific class
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: number
 *         description: The id of the class
 *     responses:
 *       200:
 *         description: Return the specified class
 *       404:
 *         description: Class not found
 */
classRouter.get('/:classId', classController.getSpecificClass);

/**
 * @swagger
 * /classes/{classId}:
 *   put:
 *     tags: ["Class"]
 *     summary: Update a class
 *     description: Update a class
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: number
 *         description: The id of the class
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Return the updated class
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Class not found
 */
classRouter.put('/:classId', classController.updateClass);

/**
 * @swagger
 * /classes/{classId}:
 *   delete:
 *     tags: ["Class"]
 *     summary: Delete a class
 *     description: Delete a class
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: number
 *         description: The id of the class
 *     responses:
 *       204:
 *         description: Delete class successful
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Class not found
 */
classRouter.delete('/:classId', classController.deleteClass);

/**
 * @swagger
 * /classes/{classId}/enrollments:
 *   get:
 *     tags: ["Class"]
 *     summary: Get enrollment of students of a class
 *     description: Get enrollment of students of a class
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: number
 *         description: The id of the class
 *     responses:
 *       200:
 *         description: Enrollment of students of a class
 *       403:
 *         description: User does not own the course
 *       404:
 *         description: Class not found
 */
classRouter.get('/:classId/enrollments', classController.getClassEnrollments);

/**
 * @swagger
 * /classes/{classId}/enrollments:
 *   post:
 *     tags: ["Class"]
 *     summary: Enroll a student
 *     description: Enroll a student
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: number
 *         description: The id of the class
 *     responses:
 *       200:
 *         description: The created enrollment of a student
 *       404:
 *         description: Class not found
 */
classRouter.post('/:classId/enrollments', classController.enrollStudent);

export default classRouter;
