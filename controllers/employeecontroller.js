const router = require("express").Router();
const { Employee } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
router.post("/create", async (req, res) => {
    let { firstName, lastName, username, department, title, hireDate, CompanyId } = req.body;
    let { id } = req.user
    try {
        const employee = await Employee.create({
            UserId: id,
            firstName,
            lastName,
            username,
            department,
            title,
            hireDate,
            CompanyId
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

/* Get employee profile for logged in user */
router.get("/", async (req, res) => {
    const { id } = req.user;
    try {
        const employeeProfile = await Employee.findOne({
            where: {
                UserId: id,
            },
        });
        res.status(200).json({employeeProfile: employeeProfile});
    } catch (err) {
        res.status(500).json({ message: `Employee profile not found. ${err}` });
    }
});

router.put("/update/:id", async (req, res) => {
    let {
        firstName,
        lastName,
        username,
        department,
        title,
        hireDate,
        CompanyId
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
        department: department,
        title: title,
        hireDate: hireDate,
        CompanyId: CompanyId
    };

    try {
        const update = await Employee.update(updatedEmployee, query);
        res.status(200).json({message: "Employee profile successfully updated!", updatedEmployee: updatedEmployee});
    } catch (err) {
        res.status(500).json({ message: `Unable to update employee profile. ${err}` });
    }
});

router.delete("/remove/:id", async (req, res) => {
    const { id, isAdmin } = req.user;
  if (isAdmin === true) {
try {
        const deletedEmployee = {
            where: {
                UserId: id
            },
        };
        await Employee.destroy(deletedEmployee);
        res.status(200).json({ message: "Employee profile successfully removed." });
    } catch (err) {
        res.status(500).json({ message: `Unable to remove employee profile. ${err}` });
    }

  } else if (isAdmin === false ) {
        res.status(500).json({ message: `Unable to remove employee profile - Administrator access required` });
}
});


module.exports = router;