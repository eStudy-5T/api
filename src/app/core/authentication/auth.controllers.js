import authenticationService from './auth.services';

const authController = {
  authenticate: (req, res, next) => {
    authenticationService
      .login(req, res, next)
      .then((loginInfo) => {
        res
          .cookie('access_info', loginInfo.accessToken, {
            sameSite: 'strict',
            secure: true
          })
          .cookie('refresh_info', loginInfo.refreshToken, {
            sameSite: 'strict',
            secure: true
          })
          .json(loginInfo);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
      });
  },

  register: (req, res, next) => {
    authenticationService
      .register(req, res, next)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
      });
  },

  logout: (req, res) => {
    req.logout();
    res.status(200).send('SUCCESS');
  }
};

export default authController;
