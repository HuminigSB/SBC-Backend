'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bilhetes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_sessao: {
        type: Sequelize.INTEGER
      },
      id_sala: {
        type: Sequelize.INTEGER
      },
      id_poltrona: {
        type: Sequelize.INTEGER
      },
      reservado: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('bilhetes');
  }
};
