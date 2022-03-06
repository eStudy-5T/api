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
      },
      {
        id: 4,
        name: 'Grade 4',
        description: 'Grade 4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Grade 5',
        description: 'Grade 5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Grade 6',
        description: 'Grade 6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Grade 7',
        description: 'Grade 7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Grade 8',
        description: 'Grade 8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Grade 9',
        description: 'Grade 9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Grade 10',
        description: 'Grade 10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Grade 11',
        description: 'Grade 11',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'Grade 12',
        description: 'Grade 12',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
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
