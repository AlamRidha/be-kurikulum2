module.exports = (sequelize, DataTypes) => {
  const ProfilPelajar = sequelize.define(
    "ProfilPelajar",
    {
      idProfil: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      dimensi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      elemen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "profil_pelajar",
      timestamps: false,
    }
  );

  return ProfilPelajar;
};
