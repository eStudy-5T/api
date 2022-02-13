'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('grades', [
      {
        id: 1,
        name: 'Grade 1',
        description: 'Grade 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Grade 2',
        description: 'Grade 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Grade 3',
        description: 'Grade 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('grades', null, {});
  }
};
