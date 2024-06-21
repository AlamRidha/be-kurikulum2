"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "mata_pelajaran",
      {
        idMp: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        namaMataPelajaran: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        tahunAjaran: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        idSemester: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "semester",
            },
            key: "idSemester",
          },
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mata_pelajaran");
  },
};
