"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "semester",
      {
        idSemester: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        namaSemester: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        idKelas: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "kelas",
            },
            key: "idKelas",
          },
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("semester");
  },
};
