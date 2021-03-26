const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./../models/user_model");
const { validateUser, checkToken ,checkUserAccount } = require("./../middlewares/user_middleware");

const router = express.Router();

router.post("/register", validateUser, checkUserAccount, async (req, res, next) => {
  const newUser = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 8),
  };

  Users.addUser(newUser)
    .then((addedUser) => {
      return res.status(200).json(addedUser);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/login", validateUser, async (req, res, next) => {
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
      expiresIn: 1000 * 86400 * 7, //1 week
    }
  );

  
  res.status(200).json(token);
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('token');
  return res.status(200).json({
    message: 'ok'
  })
})

/*router.get('/test', (req, res, next) => { //endpoint de testare
    Users.getUsers().then((users) => {
      return res.status(200).json(users)
    }).catch((err) => {
      next(err);
    })
})*/

router.get('/auth', checkToken, (req, res) => {
  return res.status(200).json({msg: 'ok'});
})

module.exports = router;
