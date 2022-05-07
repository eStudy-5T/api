'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('enrollments', 'classId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'classId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'classes',
        key: 'id'
      }
    });
  }
};
