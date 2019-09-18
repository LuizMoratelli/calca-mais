'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('calcados', {
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
      categoria_id:{
        type: Sequelize.UUID,
        references: { model: 'categoria', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,  
        default: Sequelize.fn('uuid_generate_v4')        
      },
      preco: {
        type: Sequelize.DECIMAL(10,2),
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
    return queryInterface.dropTable('calcados');
  }
};
