import User from '../../core/database/models/user';
import get from 'lodash/get';
import passport from 'passport';
import tokenService from './token.service';
import emailService from '../../core/mailer/mail.service';
import mailTemplateName from '../../core/constants/mail-template';
import userService from '../api-user/user.service';

const authenticationService = {
  setupVerifyAccountLink: async (userId) => {
    try {
      const userToken = await tokenService.generateCryptoToken();
      const tokenExpired = Date.now() + 15 * 60 * 1000; // 15 minutes
      await User.update({userToken, tokenExpired}, {where: {id: userId}});
      const verifyLink = `${process.env.APP_PORTAL_HOST_V2}/verify/${userToken}`;

      return verifyLink;
    } catch (err) {
      throw new Error(err);
    }
  },

  sendVerifyAccountEmail: async (userInfo, verifyLink) => {
    try {
      const mailData = {
        userName: `${userInfo.firstName} ${userInfo.lastName}`,
        verifyLink
      };

      return await emailService.sendMail(
        userInfo.email,
        mailTemplateName.confirmAccount.subject,
        mailTemplateName.confirmAccount.path,
        mailData
      );
    } catch (err) {
      throw new Error(err);
    }
  },

  login: (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('meettutor.login', function (err, user, info) {
        if (err) return reject(err);
        if (info) {
          return reject(info);
        } else {
          delete user.dataValues.password;
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

          const verifyLink = await authenticationService.setupVerifyAccountLink(
            userInfo.id
          );

          await authenticationService.sendVerifyAccountEmail(
            userInfo,
            verifyLink
          );

          return resolve(userInfo);
        }
      })(req, res, next);
    });
  },

  verifyAccount: async (verifyToken, userId) => {
    const userInfo = await User.findByPk(userId);
    const tokenExpired = new Date(userInfo.tokenExpired);

    if (
      verifyToken === userInfo.userToken &&
      Date.now() <= tokenExpired.getTime()
    ) {
      return await User.update(
        {
          userToken: null,
          tokenExpired: null,
          isVerified: true
        },
        {
          where: {id: userInfo.id}
        }
      );
    }

    return Promise.reject();
  }
};

export default authenticationService;
