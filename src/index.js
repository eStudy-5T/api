import 'dotenv/config';
import '../src/utils/authentication/passportLocal';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';

import {SESSION_CONFIG, API_PORT} from './constants/appConfig';
import router from './app/app.routes';
import dbPostgres from './utils/database/config';
import {configHeader} from './utils';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8888']
  })
);
app.use(configHeader);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(SESSION_CONFIG));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

app.use('/auth', router.authRouter);

dbPostgres.authenticate().then(() => {
  console.log('Connected to db');
  app.listen(API_PORT, () => {
    console.log(`Listening on port: ${API_PORT}`);
  });
});
