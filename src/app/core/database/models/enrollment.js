import Sequelize from 'sequelize';
import sequelize from '../sequelize';

import User from './user';
import Course from './course';
import Class from './class';

const schema = {
  userId: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  courseId: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  classId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'classes',
      key: 'id'
    }
  }
};

const options = {
  paranoid: true
};

const Enrollment = sequelize.define('enrollment', schema, options);

Enrollment.belongsTo(User, {constraint: false});
Enrollment.belongsTo(Course, {constraint: false});
Enrollment.belongsTo(Class, {constraint: false});

export default Enrollment;
