require("dotenv").config();
const { Sequelize } = require("sequelize");

function getDbConfig(url) {
  return {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This is not recommended for production
      },
    },
    logging: console.log, // This will log SQL queries, helpful for debugging
  };
}

function createSequelizeInstance() {
  const isTest = process.env.NODE_ENV === "test";
  const dbUrl = isTest
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error(
      `Database URL not found for ${
        isTest ? "test" : "development/production"
      } environment`
    );
  }

  return new Sequelize(dbUrl, getDbConfig(dbUrl));
}

const sequelize = createSequelizeInstance();

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function syncDb(options = {}) {
  const { force, alter } = options;
  try {
    if (force) await sequelize.sync({ force: true });
    else if (alter) await sequelize.sync({ alter: true });
    else await sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (err) {
    console.error("Failed to synchronize database:", err);
  }
}

module.exports = {
  sequelize,
  syncDb,
  testConnection,
  createSequelizeInstance,
};
