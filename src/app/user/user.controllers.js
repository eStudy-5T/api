const getUserDetails = async (req, res) => {
  const userInfo = {
    id: req.user.id,
    email: req.user.email
  };
  res.status(200).send(userInfo);
};

export default {getUserDetails};
