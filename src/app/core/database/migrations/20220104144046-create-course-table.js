'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ownerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      rating: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      outline: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isOpened: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      gradeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'grades',
          key: 'id'
        }
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course-types',
          key: 'id'
        }
      },
      tags: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable('courses');
  }
};
