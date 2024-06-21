"use strict";

// belum selesai apakah harus foreign key ke mata pelajaran atau ke capaian pembelajaran
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tujuan_pembelajaran",
      {
        idTp: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        elemen_capaian: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        tujuan_pembelajaran: {
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
    await queryInterface.dropTable("tujuan_pembelajaran");
  },
};
