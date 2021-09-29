module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hireDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    });
    return Employee;
};
