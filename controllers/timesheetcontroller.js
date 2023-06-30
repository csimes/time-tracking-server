const router = require("express").Router();
const { Timesheet } = require("../models");

router.post("/new/:employee", async (req, res) => {
  let { hours, timeType, date } = req.body;
  const { employee, company, project } = req.params;

  try {
    const timesheet = await Timesheet.create({
      hours,
      timeType,
      date,
      EmployeeId: employee,
      ProjectId: project,
      CompanyId: company
    });
            res.status(200).json({
                message: "Employee timesheet has been successfully created!",
                timesheet
            });
  } catch (err) {
    res.status(500).json({
        message: `Unable to create employee timesheet. ${err}`,
    });
  }
});

/* Update timesheet by timesheet id*/
router.put("/update/:id", async (req, res) => {
  let { hours, timeType, date } = req.body;
  const { id } = req.params
  const query = {
    where: {
      id: id
    }
  }
  const updatedTimesheet = ({
          hours,
          timeType,
          date
        });
    try {
      const update = await Timesheet.update(updatedTimesheet, query);
      res.status(200).json({
          message: "Employee timesheet successfully updated!",
          updatedTimesheet: updatedTimesheet,
      });
      
    } catch (err) {
      res.status(500).json({
        message: `Unable to update employee timesheet. ${err}`,
      });
    }
});

/* Get all timesheets for logged in employee */
router.get("/:id", async (req, res) => {
  const { id } = req.params
    try {
      const employeeTimesheets = await Timesheet.findAll({
        where: {
          EmployeeId : id
        },
      });
      res.status(200).json({employeeTimesheets: employeeTimesheets});
    } catch (err) {
      res.status(500).json({ message: `Employee timesheets not found. ${err}` });
    }
});

/* Get all timesheets by CompanyId */
router.get("/bycompany/:id", async (req, res) => {
  const { isAdmin } = req.user;
  const { id } = req.params
    if (isAdmin === true) {
        try {
            const employeeTimesheets = await Timesheet.findAll({
                where: {
                    CompanyId: id,
                },
            });
            res.status(200).json(employeeTimesheets);
        } catch (err) {
            res.status(500).json({
                message: `Employee timesheets not found. ${err}`,
            });
        }
    } else if (isAdmin === false) {
        res.status(500).json({
            message: `Unable to remove employee profile - Administrator access required`,
        });
    }
});

/* Get all timesheets by ProjectId */
router.get("/byproject/:id", async (req, res) => {
  const { id } = req.params
    try {
      const employeeTimesheets = await Timesheet.findAll({
        where: {
          ProjectId: id
        },
      });
      res.status(200).json(employeeTimesheets);
    } catch (err) {
      res.status(500).json({ message: `Employee timesheets not found. ${err}` });
    }
});

router.delete("/remove/:id", async (req, res) => {
const { id } = req.params
    try {
      const deletedTimesheet = {
        where: {
          id: id
        },
      };
      await Timesheet.destroy(deletedTimesheet)
      res.status(200).json({
        message: "Employee timesheet successfully removed."
      })
    } catch (err) {
      res.status(500).json({
          message: `Unable to remove employee timesheet. ${err}`,
      });
    }
});

module.exports = router;