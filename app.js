require("dotenv").config();
const express = require("express");
const { testConnection, syncDb } = require("./db"); // Adjust the path as needed

const app = express();

async function startServer() {
  try {
    await testConnection();
    await syncDb(); // Add this if you want to sync your models with the database

    // Add headers before the routes are defined
    app.use(require("./middleware/headers"));
    const controllers = require("./controllers");
    app.use(express.json());

    app.use("/user", controllers.userController);
    app.use(require("./middleware/validate-session"));
    app.use("/employee", controllers.employeeController);
    app.use("/company", controllers.companyController);
    app.use("/timesheet", controllers.timesheetController);
    app.use("/project", controllers.projectController);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`[Server]: App is listening at port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
