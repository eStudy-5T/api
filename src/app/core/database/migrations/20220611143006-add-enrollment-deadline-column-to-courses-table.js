'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('courses', 'enrollmentDeadline', {
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn('courses', 'enrollmentDeadline');
  }
};
