'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4')
      },
      usuario_id:{
        type: Sequelize.UUID,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,  
        default: Sequelize.fn('uuid_generate_v4')
      },
      desconto: {
        type: Sequelize.DECIMAL(5,2),
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
    return queryInterface.dropTable('pedidos');
  }
};
