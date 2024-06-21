module.exports = (sequelize, DataTypes) => {
  const Kelas = sequelize.define(
    "Kelas",
    {
      idKelas: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaKelas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idFase: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "kelas",
      timestamps: false,
    }
  );

  return Kelas;
};
