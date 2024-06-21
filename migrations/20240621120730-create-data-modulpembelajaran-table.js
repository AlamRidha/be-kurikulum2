"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modul_pembelajaran", {
      idModul: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tahun_penyusunan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bab: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tema: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      alokasi_waktu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      kompetensi_awal: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      profil_pancasila: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sarana_prasarana: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      model_pembelajaran: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tujuan_bab: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deskripsi_cp: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pemahaman: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      kegiatan_pembelajaran: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("modul_pembelajaran");
  },
};
