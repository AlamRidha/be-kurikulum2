module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evaluasi", {
      idEval: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaKelas: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      semester: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tahunPelajaran: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      linkEvaluasi: {
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
