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
    }
}

export default User;

