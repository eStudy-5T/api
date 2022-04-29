import Sequelize from 'sequelize';
import sequelize from '../sequelize';

import User from './user';
import Grade from './grade';
import CourseType from './course-type';
import Category from './category';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  ownerId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
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
  oldPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  outline: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isOpened: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false
  },
  gradeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'grades',
      key: 'id'
    }
  },
  typeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'course-types',
      key: 'id'
    }
  },
  tags: {
    type: Sequelize.JSONB,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
};

const options = {
  paranoid: true
};

const Course = sequelize.define('course', schema, options);

Course.belongsTo(User, {as: 'owner', constraint: false});
Course.belongsTo(Grade, {constaint: false});
Course.belongsTo(CourseType, {as: 'type', constaint: false});
Course.belongsTo(Category, {as: 'category', constaint: false});

export default Course;
