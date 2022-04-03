import awsUploadService from '../../core/aws/file-upload.service';
import User from '../../core/database/models/user';
import get from 'lodash/get';
import WorkingExperience from '../../core/database/models/working-experience';
import Certificate from '../../core/database/models/certificate';

const userService = {
  getCurrentUser: async (userId) => {
    try {
      const user = await User.findByPk(userId, {raw: true});
      if (user) {
        const data = {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          dateOfBirth: user.dateOfBirth,
          avatar: user.avatar,
          isVerifiedToTeach: user.isVerifiedToTeach,
          isVerified: user.isVerified,
          isDisabled: user.isDisabled,
          createdAt: user.createdAt
        };

        return data;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  uploadAvatar: async (userId, avatar) => {
    try {
      const relativePath = `user/${userId}`;
      const result = await awsUploadService.uploadFile(avatar, relativePath);
      const avatarLink = get(result, 'Location');
      const user = await User.findOne({where: {id: userId}});
      await user.update({avatar: avatarLink});

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  checkUserValidity: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return {code: 404, message: 'User not found'};
      }
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  update: async (userId, data) => {
    try {
      const result = await User.update(data, {
        where: {
          id: userId
        },
        returning: true
      });

      return result[1];
    } catch (err) {
      console.error(err);
      throw 'error.updateUserFail';
    }
  },

  getWorkingExperienceList: async (userId) => {
    try {
      const workingExperience = await WorkingExperience.findAll({
        where: {
          userId
        }
      });

      return workingExperience;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  saveWorkingExperienceList: async (
    workingExperienceListToUpdate,
    workingExperienceListToCreate,
    workingExperienceIdsToDelete
  ) => {
    try {
      workingExperienceListToUpdate.map(async (we) => {
        await WorkingExperience.update(we, {
          where: {
            id: we.id
          }
        });
      });
  
      await WorkingExperience.bulkCreate(workingExperienceListToCreate);
  
      await WorkingExperience.destroy({
        where: {
          id: workingExperienceIdsToDelete
        }
      });
    } catch (err) {
      console.error(err);
      throw 'Save working experience fail';
    }
  },

  getCertificates: async (userId) => {
    try {
      const certificates = await Certificate.findAll({
        where: {
          userId
        }
      });

      return certificates;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  saveCertificates: async (
    certificatesToUpdate,
    certificatesToCreate,
    certificateIdsToDelete
  ) => {
    try {
      certificatesToUpdate.map(async (c) => {
        await Certificate.update(c, {
          where: {
            id: c.id
          }
        });
      });
  
      await Certificate.bulkCreate(certificatesToCreate);
  
      await Certificate.destroy({
        where: {
          id: certificateIdsToDelete
        }
      });
    } catch (err) {
      console.error(err);
      throw 'Save working experience fail';
    }
  },
};

export default userService;
