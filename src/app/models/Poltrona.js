import Sequelize, {Model} from 'sequelize';

class Poltrona extends Model{
    static init(sequelize){
        super.init({
            row: Sequelize.STRING,
            seat: Sequelize.INTEGER,
            value: Sequelize.INTEGER,
            situation: Sequelize.ENUM('active', 'inative'),
            type: Sequelize.ENUM('economic', 'vip', 'doble', 'wheelchair')
        },{
            sequelize
        });
    }
}

export default Poltrona;
