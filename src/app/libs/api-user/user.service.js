import awsUploadService from '../../core/aws/file-upload.service';
import User from '../../core/database/models/user';
import get from 'lodash/get';

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
  }
};

export default userService;
