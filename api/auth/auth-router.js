const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res, next) => {
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
});

router.get("/logout", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
