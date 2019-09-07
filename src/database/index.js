import Sequelize from 'sequelize';
import DataBaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User]; 

class DataBase{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(DataBaseConfig);
        models.map(model => model.init(this.connection));
        models.map(model => model.associate && model.associate(this.connection.models));
    }
}