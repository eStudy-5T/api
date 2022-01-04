import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  courseId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
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
    allowNull: false
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
    allowNull: false
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
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
};

const options = {
  paranoid: true
};

const Class = sequelize.define('Class', schema, options);

export default Class;
