import Sequelize, {Model} from 'sequelize';

class Poltrona extends Model{
    static init(sequelize){
        super.init({
            id_sala: Sequelize.INTEGER,
            row: Sequelize.INTEGER,
            column: Sequelize.INTEGER,
            value: Sequelize.STRING,
            type: Sequelize.ENUM('economic', 'vip', 'doble', 'wheelchair'),
            active: Sequelize.BOOLEAN
        },{
            tableName: 'poltronas',
            sequelize
        });
    }
}

export default Poltrona;
