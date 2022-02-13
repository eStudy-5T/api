'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'fullName', {transaction});
      await Promise.all([
        queryInterface.addColumn(
          'users',
          'roleId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'roles',
              key: 'id'
            }
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'username',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'firstName',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'lastName',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'nationality',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'avatar',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'description',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'mobilePhone',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'dateOfBirth',
          {
            type: Sequelize.DATE,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'gradeId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'grades',
              key: 'id'
            }
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'degreeId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'degrees',
              key: 'id'
            }
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'identityNumber',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'subjects',
          {
            type: Sequelize.JSONB,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'resetPasswordToken',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'userToken',
          {
            type: Sequelize.STRING,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'tokenExpired',
          {
            type: Sequelize.DATE,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'resetPasswordExpired',
          {
            type: Sequelize.DATE,
            allowNull: true
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'isActive',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
          'isVerified',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          {transaction}
        ),
        queryInterface.addColumn(
          'users',
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
        'users',
        'fullName',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        {transaction}
      );
      await Promise.all([
        queryInterface.removeColumn('users', 'roleId', {transaction}),
        queryInterface.removeColumn('users', 'username', {transaction}),
        queryInterface.removeColumn('users', 'firstName', {transaction}),
        queryInterface.removeColumn('users', 'lastName', {transaction}),
        queryInterface.removeColumn('users', 'nationality', {transaction}),
        queryInterface.removeColumn('users', 'avatar', {transaction}),
        queryInterface.removeColumn('users', 'description', {transaction}),
        queryInterface.removeColumn('users', 'mobilePhone', {transaction}),
        queryInterface.removeColumn('users', 'userToken', {transaction}),
        queryInterface.removeColumn('users', 'resetPasswordToken', {
          transaction
        }),
        queryInterface.removeColumn('users', 'dateOfBirth', {transaction}),
        queryInterface.removeColumn('users', 'tokenExpired', {transaction}),
        queryInterface.removeColumn('users', 'resetPasswordExpired', {
          transaction
        }),
        queryInterface.removeColumn('users', 'isActive', {transaction}),
        queryInterface.removeColumn('users', 'isVerified', {transaction}),
        queryInterface.removeColumn('users', 'isDisabled', {transaction}),
        queryInterface.removeColumn('users', 'gradeId', {transaction}),
        queryInterface.removeColumn('users', 'degreeId', {transaction}),
        queryInterface.removeColumn('users', 'identityNumber', {transaction}),
        queryInterface.removeColumn('users', 'subjects', {transaction})
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
