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
        name: 'Chinese',
        description: 'This is description for Chinese subject',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Math',
        description: 'This is description for Math subject',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Physics',
        description: 'This is description for Physics subject',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Biology',
        description: 'This is description for Biology subject',
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
