import userService from './user.service';

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
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
      });
  }
};

export default userController;
