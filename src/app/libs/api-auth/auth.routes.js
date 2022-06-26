import express from 'express';
import authController from './auth.controller';
import {verifyRequest} from '../../core/middlewares/verify-request';

const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Login to the application
 *     description: Login to the application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Login failed
 */
authRouter.post('/login', authController.authenticate);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Register account in application
 *     description: Register account in application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Register successfully
 *       400:
 *         description: Register failed
 */
authRouter.post('/signup', authController.register);

authRouter.get('/logout', authController.logout);

authRouter.get('/get-csrf', authController.getCSRFToken);

authRouter.get('/refresh-token', authController.refreshToken);

authRouter.put(
  '/resend-verify-email',
  verifyRequest,
  authController.resendVerifyEmail
);

authRouter.put('/verify-account', verifyRequest, authController.verifyAccount);

authRouter.put('/forgot-password', authController.forgotPassword);

authRouter.put('/reset-password', authController.resetPassword);

authRouter.get('/google', authController.authGoogle);

authRouter.get('/google/callback', authController.authGoogleCallback);

authRouter.post(
  '/google/generate-refresh-token',
  verifyRequest,
  authController.generateGoogleRefreshToken
);

authRouter.get('/facebook', authController.authFacebook);

authRouter.get('/facebook/callback', authController.authFacebookCallback);

export default authRouter;
