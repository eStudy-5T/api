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
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  receiveAt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expiredAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
};

const options = {
  paranoid: true
};

const Degree = sequelize.define('Degree', schema, options);

export default Degree;
