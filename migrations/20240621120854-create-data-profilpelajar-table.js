"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "profil_pelajar",
      {
        idProfil: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dimensi: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        elemen: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profil_pelajar");
  },
};
