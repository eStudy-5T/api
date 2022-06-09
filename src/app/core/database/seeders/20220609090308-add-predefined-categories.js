'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        code: 'language',
        name: 'Language',
        description: 'This is description for Language category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        code: 'science',
        name: 'Science',
        description: 'This is description for Science category',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
