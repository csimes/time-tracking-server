module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define("Projects", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalHours: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    });
    return Projects;
};
