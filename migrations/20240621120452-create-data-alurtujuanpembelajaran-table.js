"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "alur_tujuan_pembelajaran",
      {
        idAtp: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        tahap: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        alur_tujuan_pembelajaran: {
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
    await queryInterface.dropTable("alur_tujuan_pembelajaran");
  },
};
