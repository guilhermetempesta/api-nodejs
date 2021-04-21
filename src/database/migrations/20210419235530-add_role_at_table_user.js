'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',  
      'role', 
      {
        type: Sequelize.ENUM,
        values: [
          'admin',
          'user'  
        ],
        defaultValue: 'user',
        allowNull: false,
      }
    )   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'role')
    .then(queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";'))
  }
};