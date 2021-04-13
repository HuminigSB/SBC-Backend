import Sequelize, {Model} from 'sequelize';
import Observer from '../observer/Observer';

class Bilhete extends Model{
    static init(sequelize){
        super.init({
            id_sessao: Sequelize.INTEGER,
            id_sala: Sequelize.INTEGER,
            id_poltrona: Sequelize.INTEGER,
            reservado: Sequelize.BOOLEAN
        },{
            tableName: 'bilhetes',
            sequelize
        });
    }
    chamaObserver(observer){
        Observer.updateObserver(observer,"bilheteRemocao")
    }
}

export default Bilhete;
