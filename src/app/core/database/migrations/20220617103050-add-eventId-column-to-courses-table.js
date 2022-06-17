'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('courses', 'eventId', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn('courses', 'eventId');
  }
};
