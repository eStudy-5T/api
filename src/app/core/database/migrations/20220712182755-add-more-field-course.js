'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'courseThumbnailImage', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('courses', 'courseThumbnailVideo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('courses', 'whatStudentsGets', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('courses', 'courseThumbnailImage');
    await queryInterface.removeColumn('courses', 'courseThumbnailVideo');
    await queryInterface.removeColumn('courses', 'whatStudentsGets');
  }
};
