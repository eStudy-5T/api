import userService from './user.services';

const userController = {
  getUserDetails: (req, res) => {
    userService
      .getUserDetails(req.user.id)
      .then((userInfo) => {
        if (userInfo) {
          const resData = {
            username: userInfo.username,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            dateOfBirth: userInfo.dateOfBirth,
            avatar: userInfo.avatar,
            isActive: userInfo.isActive,
            isVerified: userInfo.isVerified,
            isDisabled: userInfo.isDisabled
          };
          res.json(resData);
        } else {
          res.send('User not found');
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
      });
  }
};

export default userController;
