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
import helper from '../../utils/helper';
import WorkingExperience from '../../core/database/models/working-experience';
import Certificate from '../../core/database/models/certificate';

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
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  uploadAvatar: async (req, res) => {
    try {
      const result = await userService.uploadAvatar(
        req.user.id,
        req.files.uploadFile
      );
      return res.json({
        avatar: get(result, 'Location')
      });
    } catch (err) {
      helper.apiHandler.handleErrorResponse(res, err);
    }
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
      return res
        .status(400)
        .json(
          `Missing required values: [${
            (!currentPassword ? 'currentPassword ' : '') +
            (!newPassword ? 'newPassword ' : '') +
            (!confirmPassword ? 'confirmPassword' : '')
          }]`
        );
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
      return res
        .status(400)
        .json(
          `Fields not match standard: [${
            (!validatePassword(newPassword, USER_PASSWORD_REGEX)
              ? 'newPassword '
              : '') +
            (!validatePassword(confirmPassword, USER_PASSWORD_REGEX)
              ? 'confirmPassword'
              : '')
          }]`
        );
    }

    // Check newPassword and confirmPassword
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json(`confirmPassword is not match with newPassword`);
    }

    // Check currentPassword is match with DB
    const user = await User.findOne({where: {id: userId}});
    if (isNil(user) || !user.comparePassword(currentPassword)) {
      return res.status(400).json(`currentPassword is not correct`);
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
  },

  update: (req, res) => {
    const {userId} = req.params;
    const data = req.body;

    userService
      .checkUserValidity(userId)
      .then((error) => {
        if (error) throw error;

        return userService.update(userId, data);
      })
      .then((updatedUser) => {
        res.status(200).send(updatedUser);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getWorkingExperienceList: (req, res) => {
    const {userId} = req.params;
    userService
      .checkUserValidity(userId)
      .then((error) => {
        if (error) throw error;

        return userService.getWorkingExperienceList(userId);
      })
      .then((workingExperienceList) => {
        res.status(200).send(workingExperienceList);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  saveWorkingExperienceList: (req, res) => {
    const {userId} = req.params;
    const workingExperienceListToUpdate =
      req.body.workingExperienceListToUpdate;
    const workingExperienceListToCreate =
      req.body.workingExperienceListToCreate;
    const workingExperienceIdsToDelete = req.body.workingExperienceIdsToDelete;

    userService
      .saveWorkingExperienceList(
        workingExperienceListToUpdate,
        workingExperienceListToCreate,
        workingExperienceIdsToDelete
      )
      .then(async () => {
        const result = await WorkingExperience.findAll({
          where: {
            userId
          }
        });
        res.status(201).send(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getCertificates: (req, res) => {
    const {userId} = req.params;
    userService
      .checkUserValidity(userId)
      .then((error) => {
        if (error) throw error;

        return userService.getCertificates(userId);
      })
      .then((certificates) => {
        res.status(200).send(certificates);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  saveCertificates: (req, res) => {
    const {userId} = req.params;
    const certificatesToUpdate = req.body.certificatesToUpdate;
    const certificatesToCreate = req.body.certificatesToCreate;
    const certificateIdsToDelete = req.body.certificateIdsToDelete;

    userService
      .saveCertificates(
        certificatesToUpdate,
        certificatesToCreate,
        certificateIdsToDelete
      )
      .then(async () => {
        const result = await Certificate.findAll({
          where: {
            userId
          }
        });
        res.status(201).send(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default userController;
