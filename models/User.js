module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    token: {
      type: DataTypes.CHAR(100),
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return User;
};
