'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('poltronas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_sala: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      row: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      column: {
        type: Sequelize.INTEGER,
        allowNull: false
     },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: ['economic', 'vip', 'doble', 'wheelchair']
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
      return queryInterface.dropTable('poltronas');
  }
};
