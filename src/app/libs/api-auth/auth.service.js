import User from '../../core/database/models/user';
import get from 'lodash/get';
import passport from 'passport';
import tokenService from './token.service';
import emailService from '../../core/mailer/mail.service';
import mailTemplateName from '../../core/constants/mail-template';
import senderType from '../../core/constants/sender-type';
import oauth2Client from '../../core/google/oauth-client';

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
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
        verifyLink
      };

      return await emailService.sendMail(
        userInfo.email,
        senderType.noreply,
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
          const userData = user.get({plain: true});
          const accessToken = tokenService.generateAccessToken(userData);
          const refreshToken = tokenService.generateRefreshToken(userData);
          const loginInfo = {
            userId: get(user, 'id'),
            firstName: get(user, 'firstName'),
            lastName: get(user, 'lastName'),
            email: get(user, 'email'),
            dateOfBirth: get(user, 'dateOfBirth'),
            avatar: get(user, 'avatar'),
            isVerifiedToTeach: get(user, 'isVerifiedToTeach'),
            isVerified: get(user, 'isVerified'),
            isDisabled: get(user, 'isDisabled'),
            createdAt: get(user, 'createdAt'),
            isAdmin: get(user, 'isAdmin', false),
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
    try {
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

      throw new Error();
    } catch (err) {
      throw new Error(err);
    }
  },

  forgotPassword: async (email) => {
    const userInfo = await User.findOne({
      where: {email}
    });

    if (!userInfo) {
      throw {status: 400, message: 'error.userNotFound'};
    }

    if (!userInfo.password) {
      throw {status: 400, message: 'error.externalLogin'};
    }

    const resetPasswordToken = await tokenService.generateCryptoToken();
    const resetPasswordExpired = Date.now() + 15 * 60 * 1000; // 15 minutes
    await User.update(
      {resetPasswordToken, resetPasswordExpired},
      {where: {email}}
    );
    const resetPasswordLink = `${process.env.APP_PORTAL_HOST_V2}/reset-password?email=${email}&token=${resetPasswordToken}`;

    const mailData = {
      fullName: `${userInfo.firstName} ${userInfo.lastName}`,
      resetPasswordLink
    };

    return await emailService.sendMail(
      userInfo.email,
      senderType.noreply,
      mailTemplateName.forgotPassword.subject,
      mailTemplateName.forgotPassword.path,
      mailData
    );
  },

  resetPassword: async (email, resetPasswordToken, newPassword) => {
    const user = await User.findOne({where: {email}});
    const tokenExpired = new Date(user.resetPasswordExpired);
    if (
      resetPasswordToken === user.resetPasswordToken &&
      Date.now() <= tokenExpired.getTime()
    ) {
      return await user.update({
        password: newPassword,
        resetPasswordToken: null,
        resetPasswordExpired: null
      });
    }

    throw {
      status: 400,
      message: 'error.invalidResetPasswordToken'
    };
  },

  googleCallback: (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('google', (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (info?.length) {
          return reject(info);
        }

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
      })(req, res, next);
    });
  },

  facebookCallback: (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('facebook', (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (info?.length) {
          return reject(info);
        }

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
      })(req, res, next);
    });
  },

  generateGoogleRefreshToken: async (userId, code) => {
    const {tokens} = await oauth2Client.getToken(code);
    const result = await User.update(
      {
        googleTokens: tokens
      },
      {
        where: {
          id: userId
        },
        returning: true,
        raw: true
      }
    );

    // eslint-disable-next-line
    const [affectedRowNum, rows] = result || [];
    const [updatedUser] = rows || [];
    return updatedUser;
  }
};

export default authenticationService;
