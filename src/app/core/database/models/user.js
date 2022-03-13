import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import bcrypt from 'bcrypt';

import Role from './role';
import Degree from './degree';
import Grade from './grade';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id'
    },
    defaultValue: 1
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dateOfBirth: {
    type: Sequelize.DATE,
    allowNull: true
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: true
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mobilePhone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gradeId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'grades',
      key: 'id'
    }
  },
  degreeId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'degrees',
      key: 'id'
    }
  },
  identityNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  subjects: {
    type: Sequelize.JSONB,
    allowNull: true
  },
  userToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tokenExpired: {
    type: Sequelize.DATE,
    allowNull: true
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetPasswordExpired: {
    type: Sequelize.DATE,
    allowNull: true
  },
  // Tài khoản có được xác thực (qua email)
  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  // Tài khoản có bị khoá
  isDisabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  // Tài khoản có được xác thực trở thành người dạy
  isVerifiedToTeach: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
};

const options = {
  paranoid: true
};

const User = sequelize.define('user', schema, options);

User.belongsTo(Role, {constraint: false});
User.belongsTo(Grade, {constraint: false});
User.belongsTo(Degree, {constraint: false});

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
