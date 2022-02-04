'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('course-types', [
      {
        description: 'Short term course',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Long term course',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('course-types', null, {});
  }
};
