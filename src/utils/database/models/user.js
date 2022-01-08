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
  username: {
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
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Roles',
      key: 'id'
    }
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
  grade: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Grades',
      key: 'id'
    }
  },
  degree: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Degrees',
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
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isDisabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
