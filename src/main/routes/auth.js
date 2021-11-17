import express from 'express';
import authController from '../../app/authentication/controllers';

const authRouter = express.Router();

authRouter.post('/login', authController.authLogin);

authRouter.post('/signup', authController.authSignup);

authRouter.post('/logout', authController.authLogout);

export default authRouter;
