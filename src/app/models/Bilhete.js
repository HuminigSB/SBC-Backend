import Sequelize, {Model} from 'sequelize';

class Bilhete extends Model{
    static init(sequelize){
        super.init({
            id_sessao: Sequelize.INTEGER,
            id_sala: Sequelize.INTEGER,
            id_poltrona: Sequelize.INTEGER,
            reservado: Sequelize.BOOLEAN
        },{
            sequelize
        });
    }
}

export default Bilhete;
