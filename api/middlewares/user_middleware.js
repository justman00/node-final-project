const Users = require('./../models/user_model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({
            msg: 'Invalid credentials'
        })
    }
    else
    Users.getByUserName(req.body.username).then((user) => {
        console.log('user :', user)
        if(user) {
            if(user.username === req.body.username) {
                return res.status(409).json({
                    msg: 'username already taken'
                })
            }
        }
        else if(!user) {
            next();
        }
    }).catch((err) => {
        next(err);
    })
}

const checkToken = (req, res, next) => {
    const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.log('sint in checkToken: ', err)
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.decoded = decoded;
    next();
  });
}

module.exports = {
    validateUser,
    checkToken
}