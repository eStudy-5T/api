'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('teacher-infos', 'profileStatus', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('teacher-infos', 'commentForAdmin', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('teacher-infos', 'version', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('teacher-infos', 'profileStatus');
    await queryInterface.removeColumn('teacher-infos', 'commentForAdmin');
    await queryInterface.removeColumn('teacher-infos', 'version');
  }
};
