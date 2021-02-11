import Sequelize from 'sequelize';

import Bilhete from '../app/models/Bilhete';
import Cinema from '../app/models/Cinema';
import Combo from '../app/models/Combo';
import Endereco from '../app/models/Endereco';
import User from '../app/models/User';
import Poltrona from '../app/models/Poltrona';
import Reserva from '../app/models/Reserva';
import Sala from '../app/models/Sala';
import Sessao from '../app/models/Sessao';

import databaseConfig from '../config/database';

const models = [Bilhete, Cinema, Combo, Endereco, User, Poltrona, Reserva, Sala, Sessao];

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
