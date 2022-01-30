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
userRouter.get('/get_user_info_details', userController.getUserDetails);

export default userRouter;
