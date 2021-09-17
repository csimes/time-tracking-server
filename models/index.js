const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

/* Model Functions */
const DefineUser = require('./User')
const DefineEmployee = require("./Employee");
// const DefineCompany = require("./Company");
// const DefineHours = require("./Hours");
// const DefineProjects = require("./Projects");

/* Model Definitions */
const User = DefineUser(sequelize, DataTypes)
const Employee = DefineEmployee(sequelize, DataTypes);
// const Company = DefineCompany(sequelize, DataTypes);
// const Hours = DefineHours(sequelize, DataTypes);
// const Projects = DefineProjects(sequelize, DataTypes);

/* Associations */
// Employee.hasOne(User)
// User.belongsTo(Employee)
// Company.hasMany(Employee)

/* Sync */
syncDb(sequelize, { alter: true });

module.exports = { User, Employee
  // , Company, Hours, Projects 
};