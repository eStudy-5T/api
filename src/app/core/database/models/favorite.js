import Sequelize from 'sequelize';
import sequelize from '../sequelize';

import User from './user';
import Course from './course';

const schema = {
  userId: {
    primaryKey: true,
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  courseId: {
    primaryKey: true,
    type: Sequelize.UUID,
    references: {
      model: 'courses',
      key: 'id'
    }
  }
};

const options = {
  paranoid: true
};

const Favorite = sequelize.define('enrollment', schema, options);

Favorite.belongsTo(User, {through: Favorite});
Favorite.belongsTo(Course, {through: Favorite});

export default Favorite;
