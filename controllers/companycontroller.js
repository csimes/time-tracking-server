const router = require("express").Router();
const { Company } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
router.post("/create", async (req, res) => {
    let { companyName, location } = req.body;
    let { isAdmin } = req.user;
    if (isAdmin === true )
    try {
        const company = await Company.create({companyName, location});
        res.status(200).json({
            message: "Company profile has been successfully created!",
            companyProfile: company,
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Company already exists.",
            });
        } else {
            res.status(500).json({
                message: `Unable to create company profile. ${err}`,
            });
        }
    } else if (isAdmin === false) {
        res.status(500).json({
            message: `Unable to create company profile - Administrator access required`,
        });
    }
});

/* Get company profile by name */
router.get("/:name", async (req, res) => {
  const company = req.params.name;
    try {
        const companyProfile = await Company.findOne({
            where: {
                companyName: company,
            },
        });


        res.status(200).json(companyProfile);
    } catch (err) {
        res.status(500).json({ message: `Company profile not found. ${err}` });
    } 
});


router.put("/update/:name", async (req, res) => {
    const company = req.params.name;
    let { isAdmin } = req.user;
    let { companyName , location } = req.body;
    const query = {
        where: {
            companyName: company,
        },
    };

    const updatedCompany = { companyName: companyName, location: location };

    if (isAdmin === true)
        try {
            const update = await Company.update(updatedCompany, query);
            res.status(200).json({
                message: "Company profile successfully updated!",
                updatedCompany: updatedCompany,
            });
        } catch (err) {
            res.status(500).json({
                message: `Unable to update company profile. ${err}`,
            });
        }
    else if (isAdmin === false) {
        res.status(500).json({
            message: `Unable to update company profile - Administrator access required`,
        });
    }
});

router.delete("/remove", async (req, res) => {
  res.status(200).json({
      message: "Companies may not be deleted from the database!",
  });
});

module.exports = router;
