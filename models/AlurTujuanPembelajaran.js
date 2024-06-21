module.exports = (sequelize, DataTypes) => {
  const AlurTujuanPembelajaran = sequelize.define(
    "AlurTujuanPembelajaran",
    {
      idAtp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tahap: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      alur_tujuan_pembelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idMp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "alur_tujuan_pembelajaran",
      timestamps: false,
    }
  );

  return AlurTujuanPembelajaran;
};
