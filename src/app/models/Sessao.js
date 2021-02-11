import Sequelize, {Model} from 'sequelize';

class Sessao extends Model{
    static init(sequelize){
        super.init({
            cod: Sequelize.STRING,
            titleMovie: Sequelize.STRING,
            description: Sequelize.STRING,
            start: Sequelize.DATE,
            end: Sequelize.DATE
        },{
            sequelize
        });
    }
}

export default Sessao;
