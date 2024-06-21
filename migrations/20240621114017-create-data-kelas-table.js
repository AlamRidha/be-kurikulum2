"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "kelas",
      {
        idKelas: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        namaKelas: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        idFase: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "fase",
            },
            key: "idFase",
          },
        },
      },
      {
        timstamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("kelas");
  },
};
