import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import bcrypt from 'bcrypt';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const options = {
  paranoid: true
};

const User = sequelize.define('User', schema, options);

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(12),
      null
    );
  }
});

User.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
