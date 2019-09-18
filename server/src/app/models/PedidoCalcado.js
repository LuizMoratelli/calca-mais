import Sequelize, { Model } from 'sequelize';

class PedidoCalcado extends Model {
  static init(sequelize) {
    super.init(
      {
        quantidade: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  };
  static associate(models){
    this.belongsTo(models.Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    this.belongsTo(models.Calcado, { foreignKey: 'calcado_id', as: 'calcado' });
  }
}

export default PedidoCalcado;