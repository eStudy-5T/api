'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('courses', 'currency', {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('courses', 'price', {
      type: Sequelize.DECIMAL(12, 2),
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('courses', 'currency', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('courses', 'price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    });
  }
};
