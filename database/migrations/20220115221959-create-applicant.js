'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applicants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      quiz_results: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applicants');
  }
};