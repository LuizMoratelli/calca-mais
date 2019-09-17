import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        pass: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (usuario)=> {
      // crypt password before save in database
      if(usuario.pass) usuario.password = await bcrypt.hash(usuario.pass, 8);
    });
    return this;
  };

  checkPassword(pass){
    return bcrypt.compare(pass, this.password);
  }
}

export default Usuario;