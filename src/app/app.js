import 'dotenv/config';
import './utils/auth-strategy/passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';

import router from './app.routes';
import middleware from './core/middlewares';
import dbPostgres from './core/database/sequelize';
import {SESSION_CONFIG} from './core/constants/appConfig';
import {swaggerSpec} from './swagger';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8888']
  })
);

app.use((req, res, next) => {
  res.setHeader('Last-Modified', new Date().toUTCString());
  res.header('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session(SESSION_CONFIG));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

// Define route
// Not authorized route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', router.authRouter);

// Authorized route
app.use('/api', middleware.verifyRequest);
app.use('/api/user', router.userRouter);

dbPostgres.authenticate().then((err) => {
  if (err) {
    console.log('Unable to connect to PostgreSQL.');
    process.exit(1);
  }
});

export default app;
