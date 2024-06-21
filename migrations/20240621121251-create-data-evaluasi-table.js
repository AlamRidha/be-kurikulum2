"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evaluasi", {
      idEval: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaFase: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      semester: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mata_pelajaran: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jenis_evaluasi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      masalah_evaluasi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status_evaluasi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("evaluasi");
  },
};
