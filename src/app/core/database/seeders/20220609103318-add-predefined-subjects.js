'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('subjects', [
      {
        id: 1,
        name: 'English',
        description: 'This is description for English subject',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Japanese',
        description: 'This is description for Japanese subject',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Math',
        description: 'This is description for Math subject',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
