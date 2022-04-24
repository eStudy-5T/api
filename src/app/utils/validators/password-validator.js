const USER_PASSWORD_REGEX = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

const validatePassword = (password) => {
  return USER_PASSWORD_REGEX.test(password);
};

export default validatePassword;
