require("dotenv").config();
const connString = process.env.DATABASE_URL;
const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   /* ssl=true must be appended to database url to prevent error stating ssl/tls is required */
//   process.env.DATABASE_URL,
//   process.env.HOST != "localhost"
// ? {
//         dialect: "postgres",

//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {
//         dialect: "postgres",
//       }
// );

const sequelize = new Sequelize(connString, {
  dialect: "postgres",
});

async function syncDb(sequelize, options) {
  const { force, alter } = options;
  try {
    if (force) await sequelize.sync({ force: true });
    else if (alter) await sequelize.sync({ alter: true });
    else await sequelize.sync();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sequelize,
  syncDb,
};
