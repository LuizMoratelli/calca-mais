import Sequelize, { Model } from 'sequelize';

class Calcado extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        preco: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  };

  static associate(models){
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
  }
}

export default Calcado;