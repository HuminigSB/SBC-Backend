import Sequelize, {Model} from 'sequelize';

class Reserva extends Model{
    static init(sequelize){
        super.init({
            id_bilhete: Sequelize.INTEGER,
            id_combo: Sequelize.INTEGER
        },{
            sequelize
        });
    }
}

export default Reserva;
