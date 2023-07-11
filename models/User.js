module.exports = (sequelize, DataTypes, user_profiles) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: user_profiles,
    }
  );
  return User;
};
