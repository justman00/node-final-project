const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../users/users-model");

const restricted = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Token required." });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Token invalid." });
        }

        console.log("decoded", decoded);
        req.decoded = decoded;
        next();
      });
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameFree = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findBy({username});
    //console.log("user", user);
    if (user) {
      return res.status(422).json({ message: "Username is already taken." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkPasswordLength = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password || password.length <= 3) {
      return res
        .status(422)
        .json({ message: "Password must be longer than 3 chars." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findBy({username});
    console.log("user", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkPasswordValid = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findBy({username});
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    } else {
      next();
    }
  } catch (err) {}
};

module.exports = {
  restricted,
  checkUsernameFree,
  checkPasswordLength,
  checkUsernameExists,
  checkPasswordValid,
};
