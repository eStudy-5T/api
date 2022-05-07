'use strict';
const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');

module.exports = {
  up: async (queryInterface) => {
    const tempCategory = await queryInterface.rawSelect(
      'categories',
      {
        where: {
          id: 1
        }
      },
      ['id']
    );

    return (
      !isEmpty(tempCategory) &&
      queryInterface.update(
        'courses',
        'categoryId',
        get(tempCategory, 'id', null)
      )
    );
  },
  down: async (queryInterface) => {
    return queryInterface.update('courses', 'categoryId', null);
  }
};
