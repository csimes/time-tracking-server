let express = require("express");
let router = express.Router();
const { User } = require("../models");

router.post("/register", async (req, res) => {
  let message;
  let { firstName, lastName, email, password } = req.body
  console.log(User);
  try {
    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    });
    message = {
        msg: "User Created",
        user,
    };
  } catch (err) {
    console.log(err);
      if (err instanceof UniqueConstraintError) {
      res.status(409).json({
          message: "Email already in use",
      });
    } else {
        res.status(500).json({
        message : {
          msg: "Failed to register user",
      } 
        });
    }
  }
  res.json(message);
});

module.exports = router;
