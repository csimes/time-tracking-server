const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

/* Model Functions */
const DefineUser = require('./User')
const DefineEmployee = require("./Employee");
const DefineCompany = require("./Company");
// const DefineHours = require("./Hours");
// const DefineProjects = require("./Projects");

/* Model Definitions */
const User = DefineUser(sequelize, DataTypes)
const Employee = DefineEmployee(sequelize, DataTypes);
const Company = DefineCompany(sequelize, DataTypes);
// const Hours = DefineHours(sequelize, DataTypes);
// const Projects = DefineProjects(sequelize, DataTypes);

/* Associations */
User.hasOne(Employee, { foreignKey: { allowNull: false } })
Employee.belongsTo(User)


Employee.belongsTo(Company, { foreignKey: {name: "companyName", type: DataTypes.STRING, reference: "companyName", allowNull: false } })
Company.hasMany(Employee);


//Employee.hasMany(Hours)
//Hours.belongsToMany(Employee)

//Hours.hasMany(Projects)
//Projects.belongsToMany(Hours)

/* Sync */
syncDb(sequelize, { alter: true });

module.exports = { User, Employee
  // , Company, Hours, Projects 
};