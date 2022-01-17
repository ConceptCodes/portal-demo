'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.DOUBLE
      },
      comment: {
        type: Sequelize.TEXT
      },
      strengths: {
        type: Sequelize.ARRAY
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};