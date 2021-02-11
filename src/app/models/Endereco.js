import Sequelize, {Model} from 'sequelize';

class Endereco extends Model{
    static init(sequelize){
        super.init({
            idUser: Sequelize.INTEGER,
            idCine: Sequelize.INTEGER,
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
