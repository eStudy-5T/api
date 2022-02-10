import jwt from 'jsonwebtoken';
import get from 'lodash/get';
import passport from 'passport';

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY_TOKEN);
};

const generateRefreshToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY_REFRESH_TOKEN);
};

const authenticationService = {
  login: (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('meettutor.login', function (err, user, info) {
        if (err) return reject(err);
        if (info) {
          return reject(info);
        } else {
          const accessToken = generateAccessToken(user.dataValues);
          const refreshToken = generateRefreshToken(user.dataValues);
          const loginInfo = {
            id: get(user, 'dataValues.id'),
            firstName: get(user, 'dataValues.firstName'),
            lastName: get(user, 'dataValues.lastName'),
            email: get(user, 'dataValues.email'),
            accessToken,
            refreshToken
          };
          return resolve(loginInfo);
        }
      })(req, res, next);
    });
  },

  register: (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('meettutor.signup', function (err, user, info) {
        if (err) return reject(err);
        if (info) {
          return reject(info);
        } else {
          const userInfo = {
            id: get(user, 'dataValues.id'),
            firstName: get(user, 'dataValues.firstName'),
            lastName: get(user, 'dataValues.lastName'),
            email: get(user, 'dataValues.email')
          };
          return resolve(userInfo);
        }
      })(req, res, next);
    });
  }
};

export default authenticationService;
