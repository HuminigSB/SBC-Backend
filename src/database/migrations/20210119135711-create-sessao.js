'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessaos', {
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
      title_movie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duracao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      link_img:{
        type: Sequelize.STRING,
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
      return queryInterface.dropTable('sessaos');
  }
};
