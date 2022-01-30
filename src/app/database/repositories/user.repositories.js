import User from '../models/user';

const userRepository = {
  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      User.findByPk(userId, {raw: true})
        .then((user) => {
          return resolve(user);
        })
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }
};

export default userRepository;
