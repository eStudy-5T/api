import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const schema = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false
  },
  issuedDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
};

const options = {
  paranoid: true
};

const Certificate = sequelize.define('certificate', schema, options);

export default Certificate;
