module.exports = (sequelize, DataTypes) => {
  const CapaianPembelajaran = sequelize.define(
    "CapaianPembelajaran",
    {
      idCp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      elemen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      capaian_pembelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idMp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "capaian_pembelajaran",
      timestamps: false,
    }
  );

  return CapaianPembelajaran;
};
