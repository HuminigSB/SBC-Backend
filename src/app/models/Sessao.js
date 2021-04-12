import Sequelize, {Model} from 'sequelize';

class Sessao extends Model{
    static init(sequelize){
        super.init({
            idSala:  Sequelize.INTEGER,
            title_movie: Sequelize.STRING,
            description: Sequelize.TEXT,
            data: Sequelize.STRING,
            inicio: Sequelize.DATE,
            duracao: Sequelize.STRING,
            linkImg: Sequelize.STRING
        },{
            sequelize
        });
    }
}

export default Sessao;
