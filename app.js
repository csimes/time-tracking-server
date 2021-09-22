require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

;(async () => {
  const controllers = require("./controllers")

  app.use(express.json());

  app.use(require("./middleware/headers"));
  
  app.use("/user", controllers.userController);
  app.use(require("./middleware/validate-session"));
  app.use("/employee", controllers.employeeController);
  app.use("/company", controllers.companyController);
  app.use("/timesheet", controllers.timesheetController);
  // app.use("/project", controllers.projectController);

  app.listen(port, () => {
      console.log(`[Server]: App is listening at http://localhost:${port}`);
  });
})();