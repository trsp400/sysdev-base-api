import User from '../models/User';
import File from '../models/File';

import * as Yup from 'yup';

class UserController {
    async store(req, res)
    {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            cpf: Yup.string().required(),
            password: Yup.string().required().min(6),
            telefone: Yup.string().notRequired(),
            celular: Yup.string().required(),
            endereco: Yup.string().required(),
            numero: Yup.number().notRequired(),
            bairro: Yup.string().notRequired(),
            complemento: Yup.string().notRequired(),
            cep: Yup.string().required(),
            quantidade_acesso: Yup.number().notRequired(),
            recebe_bolsa: Yup.boolean().notRequired(),
            admin: Yup.boolean().required(),
        });

        if( !(await schema.isValid(req.body))) 
        {
            return res.status(400).json({ error: "Erro na validação dos dados" })
        }

        const userExistsEmail = await User.findOne({ where: { email: req.body.email } });
        const userExistsCPF = await User.findOne({ where: { cpf: req.body.cpf } });

        if (userExistsEmail)
        {
            return res.status(404).json({ message: 'Email já foi cadastrado, deseja conectar-se à sua conta?' }) ;;
        }

        if (userExistsCPF)
        {
            return res.status(404).json({ message: 'Já existe um usuário com esse CPF, deseja conectar-se à sua conta?' });;
        }
        
        const user = await User.create( req.body );

        return res.json( user );
    }

    async update( req, res ) {

        const schema = Yup.object().shape({
            name: Yup.string().notRequired(),
            email: Yup.string().email().notRequired(),
            oldPassword: Yup.string().min(6).notRequired(),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => oldPassword ? field.required() : field),
            confirmPassword: Yup.string().when( 'password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field ),
            endereco: Yup.string().notRequired(),
            telefone: Yup.string().notRequired(),
            celular: Yup.string().notRequired(),
            bairro: Yup.string().notRequired(),
            complemento: Yup.string().notRequired(),
            numero: Yup.number().notRequired(),
            cep: Yup.string().notRequired(),
            admin: Yup.bool().notRequired(),
            bairro: Yup.string().notRequired(),
            avatar_id: Yup.string().notRequired(),
            complemento: Yup.string().notRequired(),
        });
        // console.log(req.body);

        if( !(await schema.isValid(req.body))) 
        {
            return res.status(400).json({ error: "Erro na validação dos dados" })
        }

        const { email, oldPassword } = req.body;
        const user = await User.findByPk( req.userId );
        
        if (email && email !== user.email )
        {
            const userExists = await User.findOne({ where: { email } });

            if ( userExists )
            {
                return res.status(400).json({ error: "Email já existe!!" });
            }
        }
        
        if (oldPassword) {
            if ( !(await user.checkPassword(oldPassword)))
            {
                return res.status(401).json({ error: "Senha Incorreta!" });
            }
        }
        

        const { id, name, admin } = await user.update(req.body);

        return res.json( {id, name, admin} );
    }

    async index( req, res) {

        const user = await User.findByPk( req.userId );
        
        return res.json(user);    
        
        
    }
    async show( req, res) {

        const userAdmin = await User.findByPk( req.userId );
        
        if ( userAdmin.admin === false )
        {
            const user = userAdmin;
            return res.json(user);            

        } 
        else {            
            const user = await User.findAll();
            console.log( "false 2: " + userAdmin.admin );
            return res.json(user);            
        }
        
    }
}

export default new UserController();
