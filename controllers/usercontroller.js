const router = require("express").Router();
const { User } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
			const user = await User.create({
        email, password, isAdmin : req.body,
        password: bcrypt.hashSync(password, 13)
            });
        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(201).json({
            message: "User has been successfully registered!",
            user: user,
            sessionToken: token,
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: `Failed to register user. ${err}`,
            });
        }
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        const loginUser = await User.findOne({
            where: {
                email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(
                password,
                loginUser.password
            );

            if (passwordComparison) {
                let token = jwt.sign(
                    { id: loginUser.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token,
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password",
                });
            }
        } else {
            res.status(401).json({
                message: "Login failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in",
        });
    }
});

module.exports = router;
