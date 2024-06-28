"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "asesmen",
      {
        idAsesmen: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        namaBab: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        jenisAsesmen: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        bentukAsesmen: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        keterangan: {
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
    await queryInterface.dropTable("asesmen");
  },
};
