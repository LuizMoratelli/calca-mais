import * as Yup from 'yup';
import User from '../models/User';
class UserController{

    async store(req, res){
        // datas validation
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(10),
        });
        if(! (await schema.isValid(req.body)) ) return res.status(400).json({ error: "Validation fails!" });

        // check if user exists
        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if(userExists) return res.status(400).json({ error: "User already exists!" })

        const { id, name, email } = await User.create(req.body);
        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res){
        const schema = Yup.object().shape({
            name: Yup.string(),
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

        const user = await User.findByPk(req.useId);

        if(!email !== user.email){
            const userExists = await User.findOne({
                where: { email }
            });

            if(userExists) return res.status(400).json({ error: "User already exists!" });
        }

        // check i model user password already exists
        if(oldPassword && !(await user.checkPassword(oldPassword)) ) return res.status(401).json({ error: "Password does not match!" });

        const { id, name } = await user.update(req.body);
        
        return res.json({
            id,
            name,
            email
        })
    };

    async index(req, res){
        const users = await User.findAll();

        return res.json(users);
    }

    async show(req, res){
        const schema = Yup.object().shape({
            id: Yup.number(),
        });
        if(! (await schema.isValid(req.body)) ) return res.status(400).json({ error: "Not inform id" })

    }

}

export default new UserController();