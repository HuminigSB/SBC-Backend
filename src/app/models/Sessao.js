import Sequelize, {Model} from 'sequelize';

class Sessao extends Model{
    static init(sequelize){
        super.init({
            idSala:  Sequelize.INTEGER,
            title_movie: Sequelize.STRING,
            description: Sequelize.STRING,
            data: Sequelize.STRING,
            inicio: Sequelize.STRING,
            fim: Sequelize.STRING
        },{
            sequelize
        });
    }
}

export default Sessao;
