"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("buku_guru", {
      idBuku: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaBuku: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      linkBuku: {
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
    await queryInterface.dropTable("buku_guru");
  },
};
