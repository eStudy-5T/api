import express from 'express';
import teacherProfileController from './teacher-profile.controller';
import mw from '../../core/middlewares';

const teacherInfoRouter = express.Router();

teacherInfoRouter.post(
  '/upload',
  mw.verifyRequest,
  teacherProfileController.uploadProfile
);

export default teacherInfoRouter;
