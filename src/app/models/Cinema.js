import Sequelize, {Model} from 'sequelize';

class Cinema extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            cod: Sequelize.INTEGER
        },{
            sequelize
        });
    }
}

export default Cinema;
