const { sequelize } = require("../models"); // Adjust path as needed
const { createSequelizeInstance, syncDb } = require("../db");

async function setupTestDatabase() {
  const sequelize = createSequelizeInstance();
  await syncDb({ force: true }); // this will recreate all tables
  return sequelize;
}

async function teardownTestDatabase() {
  await sequelize.close();
}

module.exports = {
  setupTestDatabase,
  teardownTestDatabase,
};
