import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import User from './user';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  teacherAvatar: {
    type: Sequelize.STRING
  },
  publicTeacherName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  onlineProfile: {
    type: Sequelize.STRING
  },
  teacherSelfDescription: {
    type: Sequelize.TEXT
  },
  experiences: {
    type: Sequelize.JSONB
  },
  classGeneralInformation: {
    type: Sequelize.TEXT
  },
  classPlan: {
    type: Sequelize.TEXT
  },
  sampleTeaching: {
    type: Sequelize.STRING
  }
};

const options = {
  paranoid: true
};

const TeacherInfo = sequelize.define('teacher-info', schema, options);

TeacherInfo.belongsTo(User, {as: 'user', constraint: false});

export default TeacherInfo;
