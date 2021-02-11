'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('poltrona', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      row: {
          type: Sequelize.STRING,
          allowNull: false
      },
      seat: {
        type: Sequelize.INTEGER,
        allowNull: false
     },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      situation: {
        type: Sequelize.ENUM,
        values: ['active', 'inative']
      },
      type: {
        type: Sequelize.ENUM,
        values: ['economic', 'vip', 'doble', 'wheelchair']
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
      return queryInterface.dropTable('poltrona');
  }
};
