import Sequelize from 'sequelize';
import sequelize from '../sequelize';

import Course from './course';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  courseId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  maxSlots: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  sessionCompletedCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  schedule: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: ''
  },
  timezone: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'Asia/Hanoi'
  },
  isAvailableToJoin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  remainingSlots: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
};

const options = {
  paranoid: true
};

const Class = sequelize.define('class', schema, options);

Class.belongsTo(Course, {constraint: false});
Course.hasMany(Class, {constraint: false});

export default Class;
