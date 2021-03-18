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
            console.log('middleware error: ', err)
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        })
        
    }
    else
    return res.status(404).json({msg: 'id not valid'})
}

module.exports = {
    validateUserId
}