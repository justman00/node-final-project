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
      const newUser = await User.add({
        password: await bcrypt.hash(req.body.password, 14),
        ...req.body,
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
          user_id: req.user.user_id,
          username: req.user.username,
        },
        process.env.JWT_SECRET,
      );

      res.cookie("token", token);

      res.json({
        message: `Welcome ${req.user.username}`,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
