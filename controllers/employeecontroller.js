const router = require("express").Router();
let validateSession = require("../middleware/validate-session"); //another way to protect all routes in app.js instead of using this in each controller?
const { Employee } = require("../models");

router.post("/", async (req, res) => {
    // const { username } = req.user; // find other identifier?

    try {
        const employee = await Employee.create({
            firstName,
            lastName,
            username,
            companyName,
            department,
            title,
            hireDate : req.body
        });
        res.status(200).json({
          message: "Employee profile has been successfully created!",
          employeeProfile: employee
        });
    } catch (err) {
        res.status(500).json({ message: `Unable to create employee profile. ${err}` });
    }
});


module.exports = router;