import express from 'express';
import userController from './user.controllers';
import mw from '../../app.middlewares';

const userRouter = express.Router();

userRouter.get(
  '/getUserInfoDetails',
  mw.authVerifyToken,
  userController.getUserDetails
);

export default userRouter;
