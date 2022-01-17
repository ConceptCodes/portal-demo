'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proctors', {
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
      proctor_id: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Proctors');
  }
};