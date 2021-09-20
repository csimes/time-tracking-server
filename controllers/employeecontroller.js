const router = require("express").Router();
const { Employee } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
router.post("/", async (req, res) => {
    let { firstName, lastName, username, companyName, department, title, hireDate } = req.body;
    let { id } = req.user
    try {
        const employee = await Employee.create({
            UserId: id,
            firstName,
            lastName,
            username,
            department,
            title,
            hireDate
        });
        res.status(200).json({
          message: "Employee profile has been successfully created!",
          employeeProfile: employee
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "User already has employee profile."});
        } else {
            res.status(500).json({ message: `Unable to create employee profile. ${err}` });
        }
    }
});

/* Get employee profile by UserId */
router.get("/:id", async (req, res) => {
    const { id } = req.user;
    try {
        const employeeProfile = await Employee.findAll({
            where: {
                UserId: id,
            },
        });
        res.status(200).json(employeeProfile);
    } catch (err) {
        res.status(500).json({message: `Employee profile not found. ${err}`});
    }
});

router.put("/:id", async (req, res) => {
    let {
        firstName,
        lastName,
        username,
        companyName,
        department,
        title,
        hireDate,
    } = req.body;
    const { id } = req.user;

    const query = {
        where: {
            UserId: id,
        },
    };

    const updatedEmployee = {
        UserId: id,
        firstName: firstName,
        lastName: lastName,
        username: username,
        companyName: companyName,
        department: department,
        title: title,
        hireDate: hireDate,
    };

    try {
        const update = await Employee.update(updatedEmployee, query);
        res.status(200).json({message: "Employee Profile successfully updated!", updatedEmployee: updatedEmployee});
    } catch (err) {
        res.status(500).json({ message: `Unable to update employee profile. ${err}` });
    }
});

router.delete("/:id", async (req, res) => {
    const { id, isAdmin } = req.user;
  if (isAdmin === true) {
try {
        const deletedEmployee = {
            where: {
                UserId: id
            },
        };
        await Employee.destroy(deletedEmployee);
        res.status(200).json({ message: "Employee profile successfully removed" });
    } catch (err) {
        res.status(500).json({ message: `Unable to remove employee profile ${err}` });
    }

  } else if (isAdmin === false ) {
        res.status(500).json({ message: `Unable to remove employee profile - Administrator access required` });
}
});


module.exports = router;