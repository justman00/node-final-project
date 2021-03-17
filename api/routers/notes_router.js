const express = require('express');
const Notes = require('./../models/notes_model');

const router = express.Router();

router.post('/api/users/:id/notes', (req, res) => {
    Notes.addNote(req.body).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

router.get('/api/users/:id/notes', (req, res) => {
    Notes.getAll(req.params.id).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        return res.status(500).json({msg: 'Something went wrong'})
    })
})

router.get('/api/users/:userId/notes/:noteId', (req, res) => {
    Notes.getById(req.params.noteId).then((note) => {
        return res.status(200).json(note)
    }).catch((error) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

module.exports = router;