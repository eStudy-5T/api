import 'dotenv/config';
import '../../src/utils/authentication/passportLocal';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';

import router from './app.routes';
import dbPostgres from './database/sequelize';
import {SESSION_CONFIG} from './constants/appConfig';
import {configHeader} from '../utils';
import {swaggerSpec} from './swagger';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8888']
  })
);
app.use(configHeader);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session(SESSION_CONFIG));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', router.authRouter);
app.use('/user', router.userRouter);

dbPostgres.authenticate().then((err) => {
  if (err) {
    console.log('Unable to connect to PostgreSQL.');
    process.exit(1);
  }
});

export default app;
