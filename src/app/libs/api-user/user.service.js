import awsUploadService from '../../core/aws/file-upload.service';
import User from '../../core/database/models/user';

const userService = {
  getCurrentUser: (userId) => {
    return new Promise((resolve, reject) => {
      User.findByPk(userId, {raw: true})
        .then((user) => {
          if (!user) {
            reject('User not found');
          } else {
            const data = {
              userId: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              dateOfBirth: user.dateOfBirth,
              avatar: user.avatar,
              isActive: user.isActive,
              isVerified: user.isVerified,
              isDisabled: user.isDisabled
            };
            return resolve(data);
          }
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        });
    });
  },

  uploadAvatar: (userId, avatar) => {
    return new Promise((resolve, reject) => {
      const relativePath = `user/${userId}`;

      awsUploadService
        .uploadFile(avatar, relativePath)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default userService;
