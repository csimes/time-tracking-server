require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

;(async () => {
    app.use(express.json());

    app.use(require("./middleware/headers"));
    
    const controllers = require("./controllers")

    app.use("/user", controllers.userController);

    app.listen(port, () => {
        console.log(`[Server]: App is listening at http://localhost:${port}`);
    });
})();