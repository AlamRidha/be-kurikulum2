module.exports = (sequelize, DataTypes) => {
  const Evaluasi = sequelize.define(
    "Evaluasi",
    {
      idEval: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaFase: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      semester: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mata_pelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jenis_evaluasi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      masalah_evaluasi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status_evaluasi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "evaluasi",
    }
  );

  return Evaluasi;
};
