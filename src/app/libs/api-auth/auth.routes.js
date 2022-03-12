import express from 'express';
import authController from './auth.controller';

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

authRouter.post('/logout', authController.logout);

export default authRouter;
