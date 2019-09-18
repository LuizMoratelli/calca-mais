'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4')
      },
      nome: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      email: {
        type: Sequelize.STRING,
        alloNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
