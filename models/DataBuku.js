module.exports = (sequelize, DataTypes) => {
  const Buku = sequelize.define(
    "Buku",
    {
      idBuku: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaBuku: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkBuku: {
        type: DataTypes.TEXT,
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
      tableName: "buku_guru",
    }
  );

  return Buku;
};
