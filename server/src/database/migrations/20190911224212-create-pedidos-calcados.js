'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos_calcados', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4')
      },
      pedido_id:{
        type: Sequelize.UUID,
        references: { model: 'pedidos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,  
        default: Sequelize.fn('uuid_generate_v4')

      },
      calcado_id:{
        type: Sequelize.UUID,
        references: { model: 'calcados', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,  
        default: Sequelize.fn('uuid_generate_v4')
      },
      quantidade: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('pedidos_calcados');
  }
};
