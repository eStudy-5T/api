import passport from 'passport';
import {generateAccessToken, generateRefreshToken} from './auth.services';

const authLogin = async (req, res, next) => {
  passport.authenticate('meettutor.login', function (err, user, info) {
    if (err) res.status(500).send(err);

    if (info) {
      res.status(info.status).send(info.message);
    } else {
      const accessToken = generateAccessToken(user.dataValues);
      const refreshToken = generateRefreshToken(user.dataValues);
      const responseData = {
        id: user.dataValues.id,
        fullName: user.dataValues.fullName,
        email: user.dataValues.email,
        accessToken,
        refreshToken
      };
      res
        .status(200)
        .cookie('access_info', accessToken, {
          sameSite: 'strict',
          secure: true
        })
        .cookie('refresh_info', refreshToken, {
          sameSite: 'strict',
          secure: true
        })
        .send(responseData);
    }
  })(req, res, next);
};

const authSignup = async (req, res, next) => {
  passport.authenticate('meettutor.signup', function (err, user, info) {
    if (err) res.status(500).send(err);

    if (info) {
      res.status(info.status).send(info.message);
    } else {
      const responseData = {
        id: user.dataValues.id,
        fullName: user.dataValues.fullName,
        email: user.dataValues.email
      };

      res.status(200).send(responseData);
    }
  })(req, res, next);
};

const authLogout = async (req, res) => {
  req.logout();
  res.status(200).send('SUCCESS');
};

export default {authLogin, authSignup, authLogout};
