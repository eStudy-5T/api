import express from 'express';
import teacherProfileController from './teacher-profile.controller';
import mw from '../../core/middlewares';

const teacherInfoRouter = express.Router();

teacherInfoRouter.post(
  '/upload',
  mw.verifyRequest,
  teacherProfileController.uploadProfile
);

teacherInfoRouter.get(
  '/:userId',
  mw.verifyRequest,
  teacherProfileController.getProfileById
);

teacherInfoRouter.get(
  '/checking',
  mw.verifyRequest,
  teacherProfileController.fetchAllCheckingProfile
);

teacherInfoRouter.put(
  '/:profileId/accepted',
  mw.verifyRequest,
  teacherProfileController.acceptProfile
);

teacherInfoRouter.put(
  '/:profileId/rejected',
  mw.verifyRequest,
  teacherProfileController.rejectProfile
);

export default teacherInfoRouter;
