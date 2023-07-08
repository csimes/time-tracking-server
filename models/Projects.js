module.exports = (sequelize, DataTypes, projects) => {
    const Projects = sequelize.define("Projects", {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalHours: {
          type: DataTypes.INTEGER,
        }
    }, {
        tableName: projects
    });
    return Projects;
};
