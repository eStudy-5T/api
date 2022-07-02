import Sequelize from 'sequelize';
import sequelize from '../sequelize';

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

const Favorite = sequelize.define('favorite', schema, options);

export default Favorite;
