import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import Category from './category';

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
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
};

const options = {
  paranoid: true
};

const Subject = sequelize.define('subject', schema, options);

Subject.belongsTo(Category, {as: 'category', constaint: false});

export default Subject;
