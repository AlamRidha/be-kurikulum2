module.exports = (sequelize, DataTypes) => {
  const Kurikulum = sequelize.define(
    "Kurikulum",
    {
      idKurikulum: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaKurikulum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tahun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkKurikulum: {
        type: DataTypes.STRING,
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
      tableName: "kurikulum",
    }
  );

  return Kurikulum;
};
