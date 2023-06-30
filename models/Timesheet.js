module.exports = (sequelize, DataTypes) => {
    const Timesheet = sequelize.define("Timesheet", {
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
    return Timesheet;
};
