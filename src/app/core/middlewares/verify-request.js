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
  const {verified = 'false'} = req.query;

  if (verified === 'true') {
    return verifyRequest(req, res, next);
  }

  next();
};
