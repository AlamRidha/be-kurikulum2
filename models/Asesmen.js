module.exports = (sequelize, DataTypes) => {
  const Asesmen = sequelize.define(
    "Asesmen",
    {
      idAsesmen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaBab: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jenisAsesmen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bentukAsesmen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idMp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "asesmen",
      timestamps: false,
    }
  );

  return Asesmen;
};
