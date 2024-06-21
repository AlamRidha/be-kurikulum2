module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nip: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noHp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bidangMataPelajaran: {
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
      tableName: "users",
    }
  );

  return Users;
};
