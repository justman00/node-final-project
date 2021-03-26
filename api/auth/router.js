const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../users/model");
const { restrict, checkRequiredCredentials } = require("./middleware");
const router = express.Router();

router.post("/register", checkRequiredCredentials, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (user) {
      return res.status(422).json({ message: "Username is already taken." });
    }

    if (password.length <= 3) {
      return res
        .status(422)
        .json({ message: "Password must be longer than 3 chars." });
    }

    const newUser = await new User({
      username,
      email,
      password: await bcrypt.hash(password, 14),
    }).save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", checkRequiredCredentials, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
    );

    //res.cookie("token", token);

    res.json({
      message: `Welcome ${user.username}`,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out." });
});

router.get("/check-auth", restrict, (req, res) => {
  res.status(200).json({ message: "Logged in." });
});

module.exports = router;
