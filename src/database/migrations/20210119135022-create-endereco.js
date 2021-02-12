'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('enderecos', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        idUser: {
          type: Sequelize.INTEGER
        },
        idCine: {
          type: Sequelize.INTEGER
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        complement: {
          type: Sequelize.STRING
        },
        neighborhood: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
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
      return queryInterface.dropTable('enderecos');
  }
};
