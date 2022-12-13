require("dotenv").config();
const router = require("express").Router();
const { User } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { email, password, isAdmin } = req.body;
  try {
    encryptedPassword = await bcrypt.hash(password, 13);

    const user = await User.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      isAdmin,
    });
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user.token = token;

    res.status(200).json({
      message: "User has been successfully registered!",
      user: user,
      sessionToken: token,
    });
  } catch (err) {
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: `Unable to register user. ${err}`,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await User.findOne({
      where: {
        email,
      },
    });

    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
      //create user token

      const token = jwt.sign(
        { id: loginUser.id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      loginUser.token = token;

      res.status(200).json({
        loginUser,
        message: "User successfully logged in!",
        sessionToken: token,
      });
    } else {
      res.status(401).json({
        message: "Login failed",
      });
    }
  } catch (err) {
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    res.status(401).json({
      message: "Incorrect email or password",
    });

    res.status(500).json({
      message: `Unable to log user in. ${err}`,
    });
  }
});

module.exports = router;
