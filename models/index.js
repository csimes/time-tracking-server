const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

/* Model Functions */
const DefineUser = require("./User");
const DefineEmployee = require("./Employee");
const DefineCompany = require("./Company");
const DefineTimesheet = require("./Timesheet");
const Defineproject = require("./Project");

/* Model Definitions */
const User = DefineUser(sequelize, DataTypes, "user_profiles");
const Employee = DefineEmployee(sequelize, DataTypes, "employee_profiles");
const Company = DefineCompany(sequelize, DataTypes, "companies");
const Timesheet = DefineTimesheet(sequelize, DataTypes, "timesheets");
const Project = Defineproject(sequelize, DataTypes, "project");

/* Associations */
User.hasOne(Employee, { foreignKey: { allowNull: false } });
Employee.belongsTo(User);

Employee.belongsTo(Company);
Company.hasMany(Employee);

Employee.hasMany(Timesheet);
Timesheet.belongsTo(Employee);

Project.hasMany(Timesheet);
Timesheet.belongsTo(Project);

Company.hasMany(Project);
Project.belongsTo(Company);

Company.hasMany(Timesheet);
Timesheet.belongsTo(Company);

/* Sync */
syncDb(sequelize, { alter: true });

module.exports = { User, Employee, Company, Timesheet, Project };
