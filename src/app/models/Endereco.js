import Sequelize, {Model} from 'sequelize';

class Endereco extends Model{
    static init(sequelize){
        super.init({
            id_user: Sequelize.INTEGER,
            id_cine: Sequelize.INTEGER,
            street: Sequelize.STRING,
            number: Sequelize.INTEGER,
            complement: Sequelize.STRING,
            neighborhood: Sequelize.STRING,
            city: Sequelize.STRING,
            state: Sequelize.STRING,
            country: Sequelize.STRING
        },{
            sequelize
        });
    }
}

export default Endereco;
