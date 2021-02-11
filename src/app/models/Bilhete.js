import Sequelize, {Model} from 'sequelize';

class Bilhete extends Model{
    static init(sequelize){
        super.init({
            id_poltrona: Sequelize.INTEGER,
            id_sessao: Sequelize.INTEGER
        },{
            sequelize
        });
    }
}

export default Bilhete;
