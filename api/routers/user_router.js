const express = require('express');
const Users = require('./../models/user_model');

const router = express.Router();

router.get('/', (req, res) => {
    Users.getAll().then((users) => {
        return res.status(200).json(users)
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})