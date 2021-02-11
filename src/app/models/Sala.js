import Sequelize, {Model} from 'sequelize';

class Sala extends Model{
    static init(sequelize){
        super.init({
            total: Sequelize.INTEGER
        },{
            sequelize
        });
    }
}

export default Sala;
