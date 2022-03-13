'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'client',
        description: 'Users who use our app',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'admin',
        description: 'Users who will manage the app',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
