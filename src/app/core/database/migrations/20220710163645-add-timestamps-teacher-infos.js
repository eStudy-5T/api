'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('teacher-infos', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('teacher-infos', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('teacher-infos', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('teacher-infos', 'createdAt');
    await queryInterface.removeColumn('teacher-infos', 'updatedAt');
    await queryInterface.removeColumn('teacher-infos', 'deletedAt');
  }
};
