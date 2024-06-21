module.exports = (sequelize, DataTypes) => {
  const ModulPembelajaran = sequelize.define(
    "ModulPembelajaran",
    {
      idModul: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tahun_penyusunan: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bab: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tema: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      alokasi_waktu: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      kompetensi_awal: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      profil_pancasila: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sarana_prasarana: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      model_pembelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tujuan_bab: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deskripsi_cp: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pemahaman: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      kegiatan_pembelajaran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idMp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "modul_pembelajaran",
      timestamps: false,
    }
  );

  return ModulPembelajaran;
};
