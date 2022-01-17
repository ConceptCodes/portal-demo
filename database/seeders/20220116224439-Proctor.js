"use strict";
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Proctor", [{
          id: 0,
          name: 'concept',
          email: 'concept@temple.edu',
          proctor_id: '123',
          password: bcrypt.hashSync('root123')
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Proctor', null, {});
  },
};
