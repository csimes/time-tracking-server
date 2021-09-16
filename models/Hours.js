module.exports = (sequelize, DataTypes) => {
    const Hours = sequelize.define("Hours", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        }
    });
    return Hours;
};
