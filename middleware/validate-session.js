require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateSession = async (req, res, next) => {
  console.log("Headers:", req.headers); //Check headers coming through
  console.log("Authorization:", req.headers.authorization); //Check auth header
  if (req.method == "OPTIONS") {
    next();
  } else if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    const { authorization } = req.headers;
    const payload = authorization
      ? jwt.verify(
          authorization.includes("Bearer")
            ? authorization.split(" ")[1]
            : authorization,
          process.env.JWT_SECRET
        )
      : undefined;

    if (payload) {
      let foundUser = await User.findOne({
        where: { id: payload.id },
      });
      console.log("foundUser -->", foundUser);
      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        res.status(400).send({ message: "Not Authorized" });
      }
    } else {
      res.status(401).send({ message: "Invalid token" });
    }
  } else {
    res.status(403).send({ message: "Forbidden" });
  }
};

module.exports = validateSession;
