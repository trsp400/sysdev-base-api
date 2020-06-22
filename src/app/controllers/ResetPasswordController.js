import * as Yup from 'yup';
import bcrypt from 'bcrypt';

import User from '../models/User';

class ResetPassword {
    async update(req, res) 
    {
        const schema = Yup.object().shape({
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            confirmPassword: Yup.string().min(6).required()
        })

        if ( !( await schema.isValid(req.body) )) {
            return res.status(400).json({ error: "Erro na validação dos dados, verifique os campos." });
        }

        const { 
            cpf, 
            email, 
            password, 
            confirmPassword 
        } = req.body;

        const user = await User.findOne({ where: { cpf, email } });

        if (!user) {
            return res.status(400).json({ error: "Usuário não encontrado, verifique suas informações." });
        }

        if ( !(confirmPassword == password)  ) {
            return res.status(400).json({ erro: "As senhas estão diferentes, verifique e tente novamente." })
        }

        if ( ( await bcrypt.compare(password, user.password_hash) ) ) {
            return res.status(401).json({ message: "Essa já é a sua senha, por que não tenta fazer login?" })
        }
        
        const createNewPassword = await user.update({ password });

        return res.json(createNewPassword);

    }
}

export default new ResetPassword()