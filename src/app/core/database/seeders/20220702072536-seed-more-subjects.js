'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('subjects', [
      {
        id: 7,
        name: 'Chemistry',
        description: 'This is description for Chemistry subject',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Javascript',
        description: 'This is description for Javascript subject',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'React',
        description: 'This is description for React subject',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Angular',
        description: 'This is description for Angular subject',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Java',
        description: 'This is description for Java subject',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: '.NET',
        description: 'This is description for .NET subject',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'Music',
        description: 'This is description for Music subject',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: 'Drawing',
        description: 'This is description for Drawing subject',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: 'Literary',
        description: 'This is description for Literary subject',
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: 'History',
        description: 'This is description for History subject',
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: 'Geography',
        description: 'This is description for Geography subject',
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: 'Human Resources',
        description: 'This is description for Human Resources subject',
        categoryId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: 'Micro-Economic',
        description: 'This is description for Micro-Economic subject',
        categoryId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: 'Macro-Economic',
        description: 'This is description for Macro-Economic subject',
        categoryId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: 'Trading Law',
        description: 'This is description for Trading Law subject',
        categoryId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        name: 'Soccer',
        description: 'This is description for Soccer subject',
        categoryId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        name: 'Chess',
        description: 'This is description for Chess subject',
        categoryId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        name: 'Badminton',
        description: 'This is description for Badminton subject',
        categoryId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        name: 'Biological Diversity',
        description: 'This is description for Biological Diversity subject',
        categoryId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        name: 'Evolution',
        description: 'This is description for Evolution subject',
        categoryId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
