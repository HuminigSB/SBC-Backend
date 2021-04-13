import Sequelize, {Model} from 'sequelize';

class Sessao extends Model{
    static init(sequelize){
        super.init({
            id_sala:  Sequelize.INTEGER,
            title_movie: Sequelize.STRING,
            description: Sequelize.TEXT,
            data: Sequelize.STRING,
            inicio: Sequelize.DATE,
            duracao: Sequelize.STRING,
            link_img: Sequelize.STRING
        },{
            tableName: 'sessoes',
            sequelize
        });
    }
}

export default Sessao;
