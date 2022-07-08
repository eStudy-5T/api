import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import User from './user';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  courseId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE
  }
};

const options = {
  paranoid: true
};

const Review = sequelize.define('review', schema, options);

Review.belongsTo(User, {as: 'user', constraint: false});

export default Review;
