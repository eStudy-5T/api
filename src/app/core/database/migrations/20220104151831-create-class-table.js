'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      maxSlots: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sessionCompletedCount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      schedule: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Asia/Hanoi'
      },
      isAvailableToJoin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      remainingSlots: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('classes');
  }
};
