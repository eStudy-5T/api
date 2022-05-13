import express from 'express';
import userController from './user.controller';

const userRouter = express.Router();

/**
 * @swagger
 * /user/:userId:
 *   get:
 *     tags: ["User Info"]
 *     summary: Get user info details
 *     description: Get user info details
 *     responses:
 *       200:
 *         description: Return user info
 *       404:
 *         description: User not found
 */
userRouter.get('/:userId', userController.getCurrentUser);

/**
 * @swagger
 * /user/upload_avatar:
 *   post:
 *    tags: ["User Info"]
 *    summary: Upload Avatar
 *    description: Upload Avatar
 *    responses:
 *       200:
 *         description: Upload avatar success
 *       404:
 *         description: Upload avatar failed
 */
userRouter.post('/upload-avatar', userController.uploadAvatar);

userRouter.put('/:userId/change-password', userController.changePassword);

userRouter.put('/:userId', userController.update);

userRouter.get(
  '/:userId/get-working-experience-list',
  userController.getWorkingExperienceList
);

userRouter.post(
  '/:userId/save-working-experience-list',
  userController.saveWorkingExperienceList
);

userRouter.get('/:userId/get-certificates', userController.getCertificates);

userRouter.post('/:userId/save-certificates', userController.saveCertificates);

userRouter.get('/:userId/enrolled-courses', userController.getEnrolledCourses);

export default userRouter;
