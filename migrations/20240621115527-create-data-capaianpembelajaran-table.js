"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "capaian_pembelajaran",
      {
        idCp: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        elemen: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        capaian_pembelajaran: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        idMp: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "mata_pelajaran",
            },
            key: "idMp",
          },
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("capaian_pembelajaran");
  },
};
