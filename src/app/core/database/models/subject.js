import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
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

const Subject = sequelize.define('subject', schema, options);

export default Subject;
