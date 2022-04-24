'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        code: 'programming',
        name: 'Programming',
        description: 'This is description for Programming category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        code: 'math',
        name: 'Math',
        description: 'This is description for Math category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        code: 'english',
        name: 'English',
        description: 'This is description for English category',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
