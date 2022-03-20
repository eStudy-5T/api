import User from '../../core/database/models/user';
import get from 'lodash/get';
import passport from 'passport';
import tokenService from './token.service';
import emailService from '../../core/mailer/mail.service';
import mailTemplateName from '../../core/constants/mail-template';

const setupVerifyAccountLink = async (userId) => {
  try {
    const userToken = await tokenService.generateCryptoToken();
    const tokenExpired = Date.now() + 3600000;
    await User.update({userToken, tokenExpired}, {where: {id: userId}});
    const verifyLink = `${process.env.APP_HOST}/verify/${userToken}`;

    return verifyLink;
  } catch (err) {
    throw new Error(err);
  }
};

const authenticationService = {
  login: (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('meettutor.login', function (err, user, info) {
        if (err) return reject(err);
        if (info) {
          return reject(info);
        } else {
          const userData = user.dataValues;
          const accessToken = tokenService.generateAccessToken(userData);
          const refreshToken = tokenService.generateRefreshToken(userData);
          const loginInfo = {
            userId: get(user, 'dataValues.id'),
            firstName: get(user, 'dataValues.firstName'),
            lastName: get(user, 'dataValues.lastName'),
            email: get(user, 'dataValues.email'),
            dateOfBirth: get(user, 'dataValues.dateOfBirth'),
            avatar: get(user, 'dataValues.avatar'),
            isVerifiedToTeach: get(user, 'dataValues.isVerifiedToTeach'),
            isVerified: get(user, 'dataValues.isVerified'),
            isDisabled: get(user, 'dataValues.isDisabled'),
            createdAt: get(user, 'dataValues.createdAt'),
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
      passport.authenticate('meettutor.signup', async (err, user, info) => {
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

          const verifyLink = await setupVerifyAccountLink(userInfo.id);

          const mailData = {
            userName: `${userInfo.firstName} ${userInfo.lastName}`,
            verifyLink
          };

          await emailService.sendMail(
            userInfo.email,
            mailTemplateName.confirmAccount.subject,
            mailTemplateName.confirmAccount.path,
            mailData
          );

          return resolve(userInfo);
        }
      })(req, res, next);
    });
  }
};

export default authenticationService;
