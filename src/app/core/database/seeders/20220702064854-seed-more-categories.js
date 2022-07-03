'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 3,
        code: 'programming',
        name: 'Programming',
        description: 'This is description for Programming category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        code: 'art',
        name: 'Art',
        description: 'This is description for Art category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        code: 'social-science',
        name: 'Social Science',
        description: 'This is description for Social Science category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        code: 'human-resources',
        name: 'Human Resources',
        description: 'This is description for Human Resources category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        code: 'economy-finance',
        name: 'Economy and Finance',
        description: 'This is description for Economy and Finance category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        code: 'law',
        name: 'Law',
        description: 'This is description for Law category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        code: 'sports',
        name: 'Sports',
        description: 'This is description for Sports category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        code: 'nature-environment',
        name: 'Nature and Environment',
        description: 'This is description for Nature and Environment category',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});

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
  }
};
