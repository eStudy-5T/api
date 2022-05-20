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
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const options = {
  paranoid: true
};

const Subject = sequelize.define('subject', schema, options);

export default Subject;
