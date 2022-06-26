'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'googleTokens', {
      type: Sequelize.JSON
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'googleTokens');
  }
};
