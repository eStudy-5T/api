import Sequelize from 'sequelize';
import sequelize from '../sequelize';

import User from './user';
import Subject from './subject';
import Category from './category';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  ownerId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  link: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  currency: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    defaultValue: 0
  },
  isOpened: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  subjectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'subjects',
      key: 'id'
    }
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  maxStudentNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  enrollmentDeadline: {
    type: Sequelize.DATE
  },
  scheduleType: {
    type: Sequelize.STRING
  },
  daysOfWeek: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  startTime: {
    type: Sequelize.TIME
  },
  endTime: {
    type: Sequelize.TIME
  },
  lessonNumberPerWeek: {
    type: Sequelize.INTEGER
  },
  // [{startTime: TIME, endTime: TIME, dayOfWeek: STRING}]
  schedules: {
    type: Sequelize.JSONB
  }
};

const options = {
  paranoid: true
};

const Course = sequelize.define('course', schema, options);

Course.belongsTo(User, {as: 'owner', constraint: false});
Course.belongsTo(Subject, {as: 'subject', constaint: false});
Course.belongsTo(Category, {as: 'category', constaint: false});

export default Course;
