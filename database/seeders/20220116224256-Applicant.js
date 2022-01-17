'use strict';
import data from '../applicants.js'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Applicant', data, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Applicant', null, {});
  }
};
