'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Users', 'fullName', {transaction});
      await Promise.all([
        queryInterface.addColumn(
          'Users',
          'role',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Roles',
              key: 'id'
            }
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'username',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'firstName',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'lastName',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'nationality',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'avatar',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'description',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'mobilePhone',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'dateOfBirth',
          {
            type: Sequelize.DATE,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'grade',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Grades',
              key: 'id'
            }
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'degree',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Degrees',
              key: 'id'
            }
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'identityNumber',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'subjects',
          {
            type: Sequelize.JSONB,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'resetPasswordToken',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'userToken',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'tokenExpired',
          {
            type: Sequelize.DATE,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'resetPasswordExpired',
          {
            type: Sequelize.DATE,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'isActive',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'isVerified',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'Users',
          'isDisabled',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          {transaction}
        )
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'fullName',
        {
          type: Sequelize.STRING,
          allowNull: false
        },
        {transaction}
      );
      await Promise.all([
        queryInterface.removeColumn('Users', 'role', {transaction}),
        queryInterface.removeColumn('Users', 'username', {transaction}),
        queryInterface.removeColumn('Users', 'firstName', {transaction}),
        queryInterface.removeColumn('Users', 'lastName', {transaction}),
        queryInterface.removeColumn('Users', 'nationality', {transaction}),
        queryInterface.removeColumn('Users', 'avatar', {transaction}),
        queryInterface.removeColumn('Users', 'description', {transaction}),
        queryInterface.removeColumn('Users', 'mobilePhone', {transaction}),
        queryInterface.removeColumn('Users', 'userToken', {transaction}),
        queryInterface.removeColumn('Users', 'resetPasswordToken', {
          transaction
        }),
        queryInterface.removeColumn('Users', 'dateOfBirth', {transaction}),
        queryInterface.removeColumn('Users', 'tokenExpired', {transaction}),
        queryInterface.removeColumn('Users', 'resetPasswordExpired', {
          transaction
        }),
        queryInterface.removeColumn('Users', 'isActive', {transaction}),
        queryInterface.removeColumn('Users', 'isVerified', {transaction}),
        queryInterface.removeColumn('Users', 'isDisabled', {transaction}),
        queryInterface.removeColumn('Users', 'grade', {transaction}),
        queryInterface.removeColumn('Users', 'degree', {transaction}),
        queryInterface.removeColumn('Users', 'identityNumber', {transaction}),
        queryInterface.removeColumn('Users', 'subjects', {transaction})
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
