import User from '../models/User';

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
            recebe_auxilio: Yup.boolean().required(),
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
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => oldPassword ? field.required() : field),
            confirmPassword: Yup.string().when( 'password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field ),
            endereco: Yup.string().notRequired(),
            numero: Yup.number().notRequired(),
            bairro: Yup.string().notRequired(),
            complemento: Yup.string().notRequired(),
        });

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
        
        if ( !(await user.checkPassword(oldPassword)))
        {
            return res.status(401).json({ error: "Senha Incorreta!" });
        }

        const { id, name, admin } = await user.update(req.body);

        return res.json( {id, name, admin} );
    }

    async show( req, res) {

        const user = await User.findAll({ where: { admin: 0 } });

        return res.json(user);
    }

}

export default new UserController();
