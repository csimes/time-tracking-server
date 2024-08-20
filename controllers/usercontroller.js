require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const router = require("express").Router();
const { User } = require("../models");

const register = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const lowercaseEmail = email.toLowerCase();

  try {
    const oldUser = await User.findOne({ where: { email: lowercaseEmail } });

    if (oldUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 13);
    const user = await User.create({
      email: lowercaseEmail,
      password: encryptedPassword,
      isAdmin,
    });

    const token = jwt.sign(
      { id: user.id, email: lowercaseEmail },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json({
      message: "User has been successfully registered!",
      user: user,
      sessionToken: token,
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to register user. ${err}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const loginUser = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
      const token = jwt.sign(
        { id: loginUser.id, email: loginUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

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
    res.status(500).json({
      message: `Unable to log user in. ${err}`,
    });
  }
};

router.post("/register", register);
router.post("/login", login);

module.exports = router;
module.exports.register = register;
module.exports.login = login;
