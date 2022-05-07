import jwt from 'jsonwebtoken';
import config from '../constants/app-config';

export const verifyRequest = (req, res, next) => {
  const accessToken = req.cookies['access_token'];
  if (accessToken) {
    jwt.verify(accessToken, config.jwt.secretAccessKey, (err, user) => {
      if (err) {
        return res.status(401).send('error.accessTokenExpired');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('error.unauthorized');
  }
};

export const decideToVerify = (req, res, next) => {
  const {type} = req.query;
  if (['teacher', 'student'].includes(type)) {
    return verifyRequest(req, res, next);
  }

  next();
};
