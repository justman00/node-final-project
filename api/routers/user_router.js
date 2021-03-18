const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./../models/user_model");
const { validateUser } = require("./../middlewares/user_middleware");

const router = express.Router();

router.post("/register", validateUser, async (req, res, next) => {
  const newUser = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 8),
  };

  Users.addUser(newUser)
    .then((addesUser) => {
      return res.status(200).json(addesUser);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/login", async (req, res, next) => {
  const foundUser = await Users.Users.findOne({
    username: req.body.username,
  }).exec();
  if (!foundUser) {
    return res.status(401).json({
      msg: "You do not have an account",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    foundUser.password
  );
  if (!isValidPassword) {
    return res.status(401).json({
      msg: "You do not have an account",
    });
  }

  const token = jwt.sign(
    {
      username: foundUser.username,
      id: foundUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 1000 * 86400, //one day
    }
  );

  res.cookie('token', token);
  res.status(200).json({msg: 'ok'});
});

module.exports = router;
