import Sequelize, {Model} from 'sequelize';

class Combo extends Model{
    static init(sequelize){
        super.init({
            id_user: Sequelize.INTEGER,
            type: Sequelize.ENUM('none', 'popcorn', 'drink', 'popcorn + drink')
        },{
            sequelize
        });
    }
}

export default Combo;
