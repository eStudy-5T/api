import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const options = {
  paranoid: true
};

const CourseType = sequelize.define('CourseType', schema, options);

export default CourseType;
