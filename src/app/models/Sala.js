import Sequelize, {Model} from 'sequelize';

class Sala extends Model{
    static init(sequelize){
        super.init({
            total: Sequelize.INTEGER
        },{
            tableName: 'salas',
            sequelize
        });
    }
}

export default Sala;
