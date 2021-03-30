const express = require("express");
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser, restrictedAcces } = require("../middleware/middleware");

const router = express.Router();

router.post("/register", validateUser, async (req, res, next) => {
  const { user_name, user_email, user_password } = req.body;
  new Users({
    user_name,
    user_email,
    user_password: await bcrypt.hash(user_password, 14),
  })
    .save()
    .then((addUser) => {
      res.status(200).json(addUser);
    })
    .catch(next);
});

router.post("/login", async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;

    const foundUser = await Users.findOne({
      user_email: user_email,
    }).exec();

    if (foundUser) {
      console.log("A intrat", foundUser);
      const passwordValid = await bcrypt.compare(
        user_password,
        foundUser.user_password
      );
      if (!passwordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          user_id: foundUser._id,
          user_name: foundUser.user_name,
          user_email: foundUser.user_email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d", // 1 day
        }
      );
      res.cookie("token", token);
      return res.status(200).json({ message: "SingIn Succesful !!!" });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.info("DeveloperInfo", error);
    next();
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout Succesful !!!" });
  } catch (error) {
    next();
  }
});

router.get("/check-auth", restrictedAcces, async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Welcome !!!" });
  } catch (error) {
    next();
  }
});

module.exports = router;
