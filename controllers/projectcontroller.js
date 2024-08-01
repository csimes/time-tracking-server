const router = require("express").Router();
const { Project } = require("../models");

router.post("/new/:company", async (req, res) => {
  let { projectName, totalHours } = req.body;
  const { company } = req.params;

  try {
    const project = await project.create({
      projectName,
      totalHours,
      CompanyId: company,
    });
    res.status(200).json({
      message: "Project has been successfully created!",
      project,
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to create project. ${err}`,
    });
  }
});

/* Update project by project id */
router.put("/update/:id", async (req, res) => {
  let { projectName, totalHours } = req.body;
  const { id } = req.params;
  const query = {
    where: {
      id: id,
    },
  };
  const updatedProject = {
    projectName,
    totalHours,
  };
  try {
    const update = await project.update(updatedProject, query);
    res.status(200).json({
      message: "Project successfully updated!",
      updatedProject: updatedProject,
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to update project. ${err}`,
    });
  }
});

/* Get all project by company id */
router.get("/bycompany/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findAll({
      where: {
        CompanyId: id,
      },
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({
      message: `Company project not found. ${err}`,
    });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = {
      where: {
        id: id,
      },
    };
    await project.destroy(deletedProject);
    res.status(200).json({
      message: "Project successfully removed.",
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to remove project. ${err}`,
    });
  }
});

module.exports = router;
