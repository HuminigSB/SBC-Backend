import Sequelize from 'sequelize';

import Bilhete from '../app/models/Bilhete';
import User from '../app/models/User';
import Poltrona from '../app/models/Poltrona';
import Sala from '../app/models/Sala';
import Sessao from '../app/models/Sessao';

import databaseConfig from '../config/database';

const models = [Bilhete, User, Poltrona, Sala, Sessao];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
    }
}

export default new Database();
