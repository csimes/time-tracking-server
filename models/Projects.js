module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define("Projects", {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalHours: {
          type: DataTypes.INTEGER,
        }
    });
    return Projects;
};
