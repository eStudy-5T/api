'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('grades', [
      {
        id: 1,
        name: 'Primary',
        description: 'Primary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Secondary',
        description: 'Secondary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'High school',
        description: 'High school',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Others',
        description: 'Others',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('grades', null, {});
  }
};
