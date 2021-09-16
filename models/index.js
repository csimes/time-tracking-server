const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");


const DefineUser = require('./User')
const User = DefineUser(sequelize, DataTypes)

const DefineEmployee = require("./Employee");
const Employee = DefineEmployee(sequelize, DataTypes);

const DefineCompany = require("./Company");
const Company = DefineCompany(sequelize, DataTypes);

const DefineHours = require("./Hours");
const Hours = DefineHours(sequelize, DataTypes);

const DefineProjects = require("./Projects");
const Projects = DefineProjects(sequelize, DataTypes);

syncDb(sequelize, { alter: true });

module.exports = { User, Employee, Company, Hours, Projects };