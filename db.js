require("dotenv").config();
const { Sequelize } = require("sequelize");

function getDbConfig(url) {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    dialect: "postgres",
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
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
        isTest ? "test" : "development"
      } environment`
    );
  }

  return new Sequelize(dbUrl, getDbConfig(dbUrl));
}

const sequelize = createSequelizeInstance();

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
  createSequelizeInstance, // Exporting for testing purposes
};
