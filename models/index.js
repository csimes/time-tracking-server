const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

/* Model Functions */
const DefineUser = require("./User");
const DefineEmployee = require("./Employee");
const DefineCompany = require("./Company");
const DefineTimesheet = require("./Timesheet");
const DefineProjects = require("./Projects");

/* Model Definitions */
const User = DefineUser(sequelize, DataTypes, "user_profiles");
const Employee = DefineEmployee(sequelize, DataTypes, "employee_profiles");
const Company = DefineCompany(sequelize, DataTypes, "companies");
const Timesheet = DefineTimesheet(sequelize, DataTypes, "timesheets");
const Projects = DefineProjects(sequelize, DataTypes, "projects");

/* Associations */
User.hasOne(Employee, { foreignKey: { allowNull: false } });
Employee.belongsTo(User);

Employee.belongsTo(Company);
Company.hasMany(Employee);

Employee.hasMany(Timesheet);
Timesheet.belongsTo(Employee);

Projects.hasMany(Timesheet);
Timesheet.belongsTo(Projects);

Company.hasMany(Projects);
Projects.belongsTo(Company);

Company.hasMany(Timesheet);
Timesheet.belongsTo(Company);

/* Sync */
syncDb(sequelize, { alter: true });

module.exports = { User, Employee, Company, Timesheet, Projects };
