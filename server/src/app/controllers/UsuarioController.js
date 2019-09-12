import * as Yup from 'yup';
import Usuario from '../models/Usuario';
class UsuarioController{

    async store(req, res){
        // datas validation
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
        });
        if(! (await schema.isValid(req.body)) ) 
            return res.status(400).json({ error: "Validation fails!" });

        // check if user exists
        const usuarioExists = await Usuario.findOne({
            where: { email: req.body.email }
        });

        if(usuarioExists) return res.status(400).json({ error: "User already exists!" })

        const { id, nome, email } = await Usuario.create(req.body);
        return res.json({
            id,
            nome,
            email,
        });
    }

    async update(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(10),
            password: Yup.string().min(10).when('oldPassword', (oldPassword, field) => 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().min(10).when('password', (password, field) => 
                password ? field.required().oneOf([ Yup.ref('password') ]) : field 
            ),
        });
        if( !( await schema.isValid(req.body) ) ) return res.status(400).json({ error: "Validation fails!"});

        const { email, password } = req.body;

        const usuario = await Usuario.findByPk(req.userId);

        if(!email !== usuario.email){
            const usuarioExists = await User.findOne({
                where: { email }
            });

            if(usuarioExists) return res.status(400).json({ error: "User already exists!" });
        }

        // check i model user password already exists
        if(oldPassword && !(await usuario.checkPassword(oldPassword)) ) return res.status(401).json({ error: "Password does not match!" });

        const { id, nome } = await usuario.update(req.body);
        
        return res.json({
            id,
            nome,
            email
        })
    };

    async index(req, res){
        const usuarios = await Usuario.findAll();

        return res.json(usuarios);
    }

    async show(req, res){
        const schema = Yup.object().shape({
            id: Yup.number(),
        });
        if(! (await schema.isValid(req.body)) ) return res.status(400).json({ error: "Not inform id" })

    }

}

export default new UsuarioController();