const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");


const DefineUser = require('./User')

const User = DefineUser(sequelize, DataTypes)


syncDb(sequelize, { alter: true });

module.exports = { User };