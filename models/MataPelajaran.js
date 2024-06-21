module.exports = (sequelize, DataTypes) => {
  const MataPelajaran = sequelize.define(
    "MataPelajaran",
    {
      idMp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaMataPelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tahunAjaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idSemester: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "mata_pelajaran",
      timestamps: false,
    }
  );

  return MataPelajaran;
};
