import express from 'express';
import userController from './user.controllers';

const userRouter = express.Router();

/**
 * @swagger
 * /user/get_user_info_details:
 *   get:
 *     tags: ["User Info"]
 *     summary: Get user info details
 *     description: Get user info details when reload page
 *     responses:
 *       200:
 *         description: Return user info
 *       404:
 *         description: User not found
 */
userRouter.get('/get-user-info-details', userController.getUserDetails);

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

export default userRouter;
