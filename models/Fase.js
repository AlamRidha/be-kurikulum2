module.exports = (sequelize, DataTypes) => {
  const Fase = sequelize.define(
    "Fase",
    {
      idFase: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaFase: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "fase",
      timestamps: false,
    }
  );

  return Fase;
};
