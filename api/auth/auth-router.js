const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/users-model");
const {
  checkUsernameFree,
  checkPasswordLength,
  checkUsernameExists,
  checkPasswordValid,
} = require("./auth-middleware");
const router = express.Router();

router.post(
  "/register",
  checkUsernameFree,
  checkPasswordLength,
  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.add({
        username,
        email,
        password: await bcrypt.hash(password, 14),
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/login",
  checkUsernameExists,
  checkPasswordValid,
  async (req, res, next) => {
    try {
      const token = jwt.sign(
        {
          user_id: req.user._id,
          username: req.user.username,
        },
        process.env.JWT_SECRET,
      );

      res.cookie("token", token);

      res.json({
        message: `Welcome ${req.user.username}`,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
