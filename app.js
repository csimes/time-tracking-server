require("dotenv").config();
const Express = require("express");
const app = Express();
const port = 3000

app.use("/test", (req, res) => {
    res.send("This is a message from the test endpoint on the server!");
});

// app.use(require("./middleware/headers"));

const controllers = require("./controllers");
app.use(Express.json());

app.use("/user", controllers.userController);

require("./db").sequelize.sync();

app.listen(port, () => {
    console.log(
        `[Server]: App is listening at http://localhost:${port}`
    );
});
    