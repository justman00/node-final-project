const express = require('express');
const Notes = require('./../models/notes_model');

const router = express.Router();

router.post('/', (req, res) => {
    Notes.addNote(req.body).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

router.get('/', (req, res) => {
    Notes.getAll().then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

module.exports = router;