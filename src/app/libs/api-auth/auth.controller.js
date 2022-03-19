import authenticationService from './auth.service';
import helper from '../../utils/helper';

const authController = {
  authenticate: (req, res, next) => {
    authenticationService
      .login(req, res, next)
      .then((loginInfo) => {
        res
          .cookie('access_token', loginInfo.accessToken, {
            sameSite: 'strict',
            secure: true
          })
          .cookie('refresh_token', loginInfo.refreshToken, {
            sameSite: 'strict',
            secure: true
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
  }
};

export default authController;
