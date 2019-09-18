import Sequelize, { Model } from 'sequelize';

class Pedido extends Model {
  static init(sequelize) {
    super.init(
      {
        desconto: Sequelize.DECIMAL(5, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  };

  static associate(models){
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}

export default Pedido;