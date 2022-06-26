import authenticationService from './auth.service';
import tokenService from './token.service';
import userService from '../api-user/user.service';
import helper from '../../utils/helper';
import config from '../../core/constants/app-config';
import validators from '../../utils/validators';
import passport from 'passport';
import AuthenticationCacheService from '../../core/redis/auth-cache.service';

const authController = {
  authenticate: (req, res, next) => {
    authenticationService
      .login(req, res, next)
      .then((loginInfo) => {
        res
          .cookie('access_token', loginInfo.accessToken, {
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .cookie('refresh_token', loginInfo.refreshToken, {
            path: '/api/auth',
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .json(loginInfo);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  register: (req, res, next) => {
    authenticationService
      .register(req, res, next)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  logout: (req, res) => {
    req.logout();
    req.session.destroy();

    // Blacklist refresh token
    const refreshToken = req.cookies['refresh_token'];
    AuthenticationCacheService.blacklistToken(
      refreshToken,
      config.jwt.refreshTokenExpiration
    ).then(() => {
      res
        .clearCookie('access_token', {
          sameSite: 'strict',
          secure: true,
          httpOnly: true
        })
        .clearCookie('refresh_token', {
          path: '/api/auth',
          sameSite: 'strict',
          secure: true,
          httpOnly: true
        })
        .clearCookie('csrf_token', {
          sameSite: 'strict',
          secure: true
        })
        .end();
    });
  },

  getCSRFToken: (req, res) => {
    let cookieOption = {
      sameSite: 'strict',
      secure: true,
      maxAge: config.cookie.expiration
    };
    if (process.env.APP_PORTAL_HOST_V2 !== 'http://localhost:3000') {
      cookieOption['domain'] = process.env.APP_PORTAL_HOST_V2.split('//')[1];
    }
    res.cookie('csrf_token', req.csrfToken(), cookieOption).send();
  },

  refreshToken: async (req, res) => {
    const oldRefreshToken = req.cookies['refresh_token'];
    if (!oldRefreshToken) {
      return res.status(401).send('error.unauthorized');
    }

    try {
      const isTokenBlacklisted =
        await AuthenticationCacheService.getTokenBlacklistStatus(
          oldRefreshToken
        );
      if (isTokenBlacklisted) {
        return res.status(401).send('error.unauthorized');
      }

      const userData = await tokenService.extractUserDataFromToken(
        oldRefreshToken
      );
      const accessToken = tokenService.generateAccessToken(userData);
      const refreshToken = tokenService.generateRefreshToken(userData);
      res
        .cookie('access_token', accessToken, {
          sameSite: 'strict',
          secure: true,
          httpOnly: true,
          maxAge: config.cookie.expiration
        })
        .cookie('refresh_token', refreshToken, {
          path: '/api/auth',
          sameSite: 'strict',
          secure: true,
          httpOnly: true,
          maxAge: config.cookie.expiration
        })
        .end();
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
  },

  resendVerifyEmail: (req, res) => {
    let userInfo;
    userService
      .getCurrentUser(req.user.id)
      .then((user) => {
        userInfo = user;
        return authenticationService.setupVerifyAccountLink(req.user.id);
      })
      .then((verifyLink) => {
        return authenticationService.sendVerifyAccountEmail(
          userInfo,
          verifyLink
        );
      })
      .then(() => {
        res.status(201).end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  verifyAccount: (req, res) => {
    const {verifyToken} = req.body;
    authenticationService
      .verifyAccount(verifyToken, req.user.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  forgotPassword: (req, res) => {
    const {email} = req.body;
    authenticationService
      .forgotPassword(email)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  resetPassword: (req, res) => {
    const {email, resetPasswordToken, newPassword} = req.body;

    if (!validators.validatePassword(newPassword)) {
      return res.status(400).send('error.invalidPassword');
    }

    authenticationService
      .resetPassword(email, resetPasswordToken, newPassword)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  authGoogle: (req, res, next) => {
    passport.authenticate('google', {scope: ['profile', 'email']})(
      req,
      res,
      next
    );
  },

  authGoogleCallback: (req, res, next) => {
    authenticationService
      .googleCallback(req, res, next)
      .then((userInfo) => {
        const url = new URL(`${config.portalHost}`);
        url.searchParams.append('userId', userInfo.userId);

        res
          .cookie('access_token', userInfo.accessToken, {
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .cookie('refresh_token', userInfo.refreshToken, {
            path: '/api/auth/refresh-token',
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .cookie('csrf_token', req.csrfToken(), {
            sameSite: 'strict',
            secure: true,
            maxAge: config.cookie.expiration
          })
          .redirect(url);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  authFacebook: (req, res, next) => {
    passport.authenticate('facebook', {
      authType: 'reauthenticate',
      scope: ['public_profile', 'email']
    })(req, res, next);
  },

  authFacebookCallback: (req, res, next) => {
    authenticationService
      .facebookCallback(req, res, next)
      .then((userInfo) => {
        const url = new URL(`${config.portalHost}`);
        url.searchParams.append('userId', userInfo.userId);

        res
          .cookie('access_token', userInfo.accessToken, {
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .cookie('refresh_token', userInfo.refreshToken, {
            path: '/api/auth/refresh-token',
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .cookie('csrf_token', req.csrfToken(), {
            sameSite: 'strict',
            secure: true,
            maxAge: config.cookie.expiration
          })
          .redirect(url);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  generateGoogleRefreshToken: (req, res) => {
    authenticationService
      .generateGoogleRefreshToken(req.user.id, req.body.code)
      .then((updatedUser) => {
        res.status(200).send({
          doesGoogleGrantAccess: Boolean(updatedUser.googleTokens)
        });
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default authController;
