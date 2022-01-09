'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('CourseTypes', [
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
    return queryInterface.bulkDelete('CourseTypes', null, {});
  }
};
