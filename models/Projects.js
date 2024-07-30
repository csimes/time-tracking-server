module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalHours: {
      type: DataTypes.INTEGER,
    },
  });
  return Project;
};
