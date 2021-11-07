import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', authController.authLogin);

router.post('/signup', authController.authSignup);

router.post('/logout', authController.authLogout);

export default router;
