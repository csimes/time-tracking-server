module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Company;
};
