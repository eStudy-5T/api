import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  dateCreated: {
    type: Sequelize.DATE,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  owner: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  outline: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isOpened: {
    type: Sequelize.STRING,
    allowNull: true
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'CourseTypes',
      key: 'id'
    }
  }
};

const options = {
  paranoid: true
};

const Course = sequelize.define('Course', schema, options);

export default Course;
