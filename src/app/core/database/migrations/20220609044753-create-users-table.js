'use strict';

const ROLE = require('../../constants/role');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      socialId: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ROLE.CLIENT
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      nationality: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      mobilePhone: {
        type: Sequelize.STRING
      },
      // Giá trị sẽ là 1, 2, 3... tương ứng với lớp 1 lớp 2 lớp 3
      grade: {
        type: Sequelize.INTEGER
      },
      identityNumber: {
        type: Sequelize.STRING
      },
      userToken: {
        type: Sequelize.STRING
      },
      tokenExpired: {
        type: Sequelize.DATE
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      resetPasswordExpired: {
        type: Sequelize.DATE
      },
      // Tài khoản có được xác thực (qua email)
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      // Tài khoản có bị khoá
      isDisabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      // Tài khoản có được xác thực trở thành người dạy
      isVerifiedToTeach: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('users');
  }
};
