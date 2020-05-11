import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'; 

class User extends Model {
    static init(sequelize) {
        super.init(
        {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            cpf: Sequelize.STRING,
            data_nascimento: Sequelize.STRING,
            telefone: Sequelize.STRING,
            celular: Sequelize.STRING,
            endereco: Sequelize.STRING,
            numero: Sequelize.INTEGER,
            bairro: Sequelize.STRING,
            complemento: Sequelize.STRING,
            cep: Sequelize.STRING,
            status: Sequelize.STRING,
            recebe_auxilio: Sequelize.BOOLEAN,
            admin: Sequelize.BOOLEAN,
            avatar_id: Sequelize.INTEGER
        },
        {
            sequelize: sequelize
        }
        );

        this.addHook('beforeSave' , async user => {
            if (user.password)
            {
                user.password_hash = await bcrypt.hash( user.password, 2 );
                
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id' });
    }

    checkPassword(password)
    {
        return bcrypt.compare(password, this.password_hash);
    }

}

export default User;