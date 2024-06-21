module.exports = (sequelize, DataTypes) => {
  const TujuanPembelajaran = sequelize.define(
    "TujuanPembelajaran",
    {
      idTp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      elemen_capaian: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tujuan_pembelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idMp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "tujuan_pembelajaran",
      timestamps: false,
    }
  );

  return TujuanPembelajaran;
};
