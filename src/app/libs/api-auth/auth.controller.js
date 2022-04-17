import authenticationService from './auth.service';
import tokenService from './token.service';
import userService from '../api-user/user.service';
import helper from '../../utils/helper';
import config from '../../core/constants/app-config';

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
            path: '/api/auth/refresh-token',
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
    res
      .clearCookie('access_token', {
        sameSite: 'strict',
        secure: true,
        httpOnly: true
      })
      .clearCookie('refresh_token', {
        path: '/api/auth/refresh-token',
        sameSite: 'strict',
        secure: true,
        httpOnly: true
      })
      .clearCookie('csrf_token', {
        sameSite: 'strict',
        secure: true
      })
      .end();
  },

  getCSRFToken: (req, res) => {
    res
      .cookie('csrf_token', req.csrfToken(), {
        sameSite: 'strict',
        secure: true,
        maxAge: config.cookie.expiration
      })
      .end();
  },

  refreshToken: (req, res) => {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res.status(401).send('error.unauthorized');
    }

    tokenService
      .extractUserDataFromToken(refreshToken)
      .then((userData) => {
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
            path: '/api/auth/refresh-token',
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
            maxAge: config.cookie.expiration
          })
          .end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
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
  }
};

export default authController;
