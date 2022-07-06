'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teacher-infos', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      teacherAvatar: {
        type: Sequelize.STRING
      },
      publicTeacherName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      onlineProfile: {
        type: Sequelize.STRING
      },
      teacherSelfDescription: {
        type: Sequelize.TEXT
      },
      experiences: {
        type: Sequelize.JSONB
      },
      classGeneralInformation: {
        type: Sequelize.TEXT
      },
      classPlan: {
        type: Sequelize.TEXT
      },
      sampleTeaching: {
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teacher-infos');
  }
};
