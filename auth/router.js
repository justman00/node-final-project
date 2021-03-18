const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../users/model');
const { validateUserBody } = require('./middlewares');

const router = express.Router();
// 605386bdb7cb9535c2ebca6f
router.post('/register', validateUserBody, async (req, res, next) => {
  try {
    const newUser = await new User({
      email,
      password: await bcrypt.hash(password, 14),
    }).save();

    res.status(201).json({ message: 'ok', userId: newUser._id });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateUserBody, async (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordValid = await bcrypt.compare(password, foundUser.password);

  if (!passwordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      email: foundUser.email,
      id: foundUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  );

  res.cookie('token', token);

  res.status(200).json({ message: 'ok' });
});

router.get('/logout', (req, res) => {
  // destrugem tokenul sau sa-l stergem
  res.clearCookie('token');

  res.status(200).json({ message: 'ok' });
});

module.exports = router;
