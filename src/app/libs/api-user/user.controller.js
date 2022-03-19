import userService from './user.service';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import User from '../../core/database/models/user';

const USER_PASSWORD_REGEX = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
const validatePassword = (password, regExp) => {
  return regExp.test(password);
};

const userController = {
  getCurrentUser: (req, res) => {
    const {userId} = req.params;

    userService
      .getCurrentUser(userId)
      .then((userInfo) => {
        if (userInfo) {
          res.json(userInfo);
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
      });
  },

  uploadAvatar: (req, res) => {
    userService
      .uploadAvatar(req.user.id, req.files.uploadFile)
      .then((result) => {
        console.log(result);
        res.json({
          avatar: result.Location
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
      });
  },

  changePassword: async (req, res) => {
    const userId = get(req, 'user.id');
    const {
      currentPassword = '',
      newPassword = '',
      confirmPassword = ''
    } = req.body;

    // Check if passwords is filled
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: `Missing required values: [${
          (!currentPassword ? 'currentPassword ' : '') +
          (!newPassword ? 'newPassword ' : '') +
          (!confirmPassword ? 'confirmPassword' : '')
        }]`
      });
    }

    // Check pattern for passwords
    if (
      !validatePassword(newPassword, USER_PASSWORD_REGEX) ||
      !validatePassword(confirmPassword, USER_PASSWORD_REGEX)
    ) {
      console.log(
        !validatePassword(newPassword, USER_PASSWORD_REGEX),
        !validatePassword(confirmPassword, USER_PASSWORD_REGEX)
      );
      return res.status(400).json({
        message: `Fields not match standard: [${
          (!validatePassword(newPassword, USER_PASSWORD_REGEX)
            ? 'newPassword '
            : '') +
          (!validatePassword(confirmPassword, USER_PASSWORD_REGEX)
            ? 'confirmPassword'
            : '')
        }]`
      });
    }

    // Check newPassword and confirmPassword
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({message: 'confirmPassword is not match with newPassword'});
    }

    // Check currentPassword is match with DB
    const user = await User.findOne({where: {id: userId}});
    if (isNil(user) || !user.comparePassword(currentPassword)) {
      return res.status(400).json({
        message: 'currentPassword is not correct'
      });
    }

    try {
      await user.update({password: newPassword});
      req.logout();
      res
        .status(200)
        .clearCookie('access_token')
        .clearCookie('refresh_token')
        .send('OK');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

export default userController;
