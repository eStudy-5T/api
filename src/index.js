import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';

import {SESSION_CONFIG, API_PORT} from './constants';
import router from './main/routes';
// import '../src/utils/authentication/passportLocal';
import dbPostgres from './utils/database/config';
import {configHeader} from './utils';
import {authVerifyToken} from './validators/auth';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(SESSION_CONFIG));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');
app.use(configHeader);

app.use('/auth', router.authRouter);

app.get('/', authVerifyToken, (req, res) => {
  res.status(200).send('Hello World!');
});

dbPostgres.authenticate().then(() => {
  console.log('Connected to db');
  app.listen(API_PORT, () => {
    console.log(`Listening on port: ${process.env.PORT || 3000}`);
  });
});
