import bcrypt from 'bcrypt'
import Sequelize, {Model} from 'sequelize';

class User extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            cpf: Sequelize.STRING,
            rg: Sequelize.STRING,
            email: Sequelize.STRING,
            phone: Sequelize.ENUM('fixo', 'movel'),
            number: Sequelize.STRING,
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            profile: Sequelize.ENUM('admin', 'funcionario', 'cliente')
        },{
            sequelize
        });

        this.addHook('beforeCreate', async user => {
            if(user.password){
                user.password = await bcrypt.hash(user.password, 8)
            }
        });

        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password)
    }
}

export default User;

