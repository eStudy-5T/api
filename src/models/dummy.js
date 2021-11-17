import Sequelize from 'sequelize';
import sequelize from '../utils/database/config';

const Dummy = sequelize.define('dummy', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  something: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default Dummy;
