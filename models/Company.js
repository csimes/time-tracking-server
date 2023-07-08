module.exports = (sequelize, DataTypes, companies) => {
  const Company = sequelize.define(
    "Company",
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: companies,
    }
  );
  return Company;
};
