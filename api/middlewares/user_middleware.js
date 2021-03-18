const Users = require('./../models/user_model');
const mongoose = require('mongoose');

const validateUserId = (req, res, next) => {
    if(mongoose.Types.ObjectId.isValid(req.params.userId)) {
        Users.getById(req.params.userId).then((user) => {
            if(!user) {
                return res.status(404).json({
                    msg: 'No user found'
                })
            }
            else
            next();
        }).catch((err) => {
            next(err);
        })
        
    }
    else
    return res.status(404).json({msg: 'id not valid'})
}

const validateUser = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({
            msg: 'Invalid credentials'
        })
    }
    else
    Users.getAll().then((users) => {
        users.forEach((user) => {
            if(user.username === req.body.username) {
                return res.status(409).json({
                    msg: 'username already taken'
                })
            }
        })
    }).catch((err) => {
        next(err);
    })
    
    next();
}

module.exports = {
    validateUserId,
    validateUser
}