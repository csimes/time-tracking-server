require("dotenv").config();
const express = require("express");
const app = express();
;(async () => {
  app.use(require("./middleware/headers"));
  const controllers = require("./controllers")
  app.use(express.json());

  app.use("/user", controllers.userController);
  app.use(require("./middleware/validate-session"));
  app.use("/employee", controllers.employeeController);
  app.use("/company", controllers.companyController);
  app.use("/timesheet", controllers.timesheetController);
  app.use("/project", controllers.projectsController);

  app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening at port ${process.env.PORT}`);
  });
})();