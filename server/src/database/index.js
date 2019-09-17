import Sequelize, { DatabaseError } from 'sequelize';
import DataBaseConfig from '../config/database';
import Usuario from '../app/models/Usuario';

const models = [Usuario]; 

class DataBase{
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DataBaseConfig);
    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new DataBase();