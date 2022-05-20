'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      timestamp: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
    await queryInterface.dropTable('reviews');
  }
};
