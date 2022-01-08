import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
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

const Grade = sequelize.define('Grade', schema, options);

export default Grade;
