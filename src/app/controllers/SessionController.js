import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
    async store (req, res)
    {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user)
        {
            return res.status(404).json({ error: "Email não encontrado" });
        }

        if ( !(await user.checkPassword(password)))
        {
            return res.status(401).json({ error: "Senha Incorreta!" });
        }

        const { 
            id, 
            name,
            cpf,
            data_nascimento,
            telefone,
            endereco,
            numero,
            bairro,
            complemento,
            cep,
            recebe_axuilio,
            admin
        } = user;

        return res.json({
            user,
            token: jwt.sign({ id }, authConfig.secret, { //embaixada_do_bem
                expiresIn: authConfig.expiresIn,
            }),
            
        })

    }
}

export default new SessionController();