'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'isSubmitted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });

    await queryInterface.addColumn('courses', 'isSubmitted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'isSubmitted');
    await queryInterface.removeColumn('courses', 'isSubmitted');
  }
};
