import 'dotenv/config';
import './core/auth-strategy/passport-local';
import './core/auth-strategy/passport-google';
import './core/auth-strategy/passport-facebook';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import csurf from 'csurf';

import router from './app.routes';
import middleware from './core/middlewares';
import dbPostgres from './core/database/sequelize';
import config from './core/constants/app-config';
import {swaggerSpec} from './swagger';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.APP_PORTAL_HOST_V2
  })
);

app.use((req, res, next) => {
  res.setHeader('Last-Modified', new Date().toUTCString());
  res.header('Access-Control-Allow-Origin', process.env.APP_PORTAL_HOST_V2);
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');
app.use(
  csurf({
    cookie: {httpOnly: true, secure: true, sameSite: 'strict'}
  })
);

// Define route
// Not authorized route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', router.authRouter);
app.use('/api/courses', router.courseRouter);
app.use('/api/reviews', router.reviewRouter);

// Authorized route
app.use('/api', middleware.verifyRequest);
app.use('/api/user', router.userRouter);
app.use('/api/classes', router.classRouter);

app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  res.status(403).send('error.csrfTokenInvalid');
});

dbPostgres.authenticate().then((err) => {
  if (err) {
    console.log('Unable to connect to PostgreSQL.');
    process.exit(1);
  }
});

export default app;
