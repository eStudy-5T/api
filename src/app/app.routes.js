import authRouter from './libs/api-auth/auth.routes';
import userRouter from './libs/api-user/user.routes';
import courseRouter from './libs/api-course/course.routes';
import reviewRouter from './libs/api-reviews/review.routes';
import teacherInfoRouter from './libs/api-teacher-profile/teacher-profile.routes';

export default {
  authRouter,
  userRouter,
  courseRouter,
  reviewRouter,
  teacherInfoRouter
};
