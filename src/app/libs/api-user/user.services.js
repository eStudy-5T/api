import userRepository from '../../core/database/repositories/user.repositories';

const userService = {
  getUserDetails: (userId) => {
    return new Promise((resolve, reject) => {
      userRepository
        .getUserById(userId)
        .then((user) => {
          return resolve(user);
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        });
    });
  }
};

export default userService;
