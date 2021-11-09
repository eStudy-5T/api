import passport from 'passport';
import {
  generateAccessToken,
  generateRefreshToken
} from '../services/auth.service';

/**
 * @api {post} /login Log In
 *
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's unique email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} id User's unique ID
 * @apiSuccess {String} email Email
 * @apiSuccess {String} username Username
 * @apiSuccess {String} accessToken Access token
 * @apiSuccess {String} refreshToken Refresh token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "email": "bkhactri@apple.com",
 *      "username": bkhactri
 *      "accessToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2",
 *      "refreshToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2"
 *    }]
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    HTTP/1.1 400 Login information is not matched with any account
 */
const authLogin = async (req, res, next) => {
  passport.authenticate('classroom.login', function (err, user, info) {
    if (err) res.status(500).send(err);

    if (info) {
      res.status(info.status).send(info.message);
    } else {
      const accessToken = generateAccessToken(user.dataValues);
      const refreshToken = generateRefreshToken(user.dataValues);
      const {id, username, email} = user.dataValues;
      const responseData = {id, username, email, accessToken, refreshToken};
      res.status(200).send(responseData);
    }
  })(req, res, next);
};

/**
 * @api {post} /signup Sign up account
 *
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's unique email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} id User's unique ID
 * @apiSuccess {String} email Email
 * @apiSuccess {String} username Username
 * @apiSuccess {String} accessToken Access token
 * @apiSuccess {String} refreshToken Refresh token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "email": "bkhactri@apple.com",
 *      "username": bkhactri
 *      "accessToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2",
 *      "refreshToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2"
 *    }]
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    HTTP/1.1 400 Login information is not matched with any account
 */
const authSignup = async (req, res, next) => {
  passport.authenticate('classroom.signup', function (err, user, info) {
    if (err) res.status(500).send(err);

    if (info) {
      res.status(info.status).send(info.message);
    } else {
      res.status(200).send(user.dataValues);
    }
  })(req, res, next);
};

/**
 * @api {post} /logout Log out
 *
 * @apiGroup Authentication
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
const authLogout = async (req, res) => {
  req.logout();
  res.status(200).send('SUCCESS');
};

export default {authLogin, authSignup, authLogout};
