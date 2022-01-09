import express from 'express';
import authController from './auth.controllers';

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
authRouter.post('/login', authController.authLogin);

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
authRouter.post('/signup', authController.authSignup);

authRouter.post('/logout', authController.authLogout);

export default authRouter;
