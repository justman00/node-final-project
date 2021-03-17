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
    Notes.getById(req.params.noteId, req.params.userId).then((note) => {
        if(!note) {
            return res.status(400).json({msg: 'Note not found'}) //nu functioneaza
        }
        else
        return res.status(200).json(note)
           
    }).catch((error) => {
        console.log('error: ',error)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

router.delete('/api/users/:userId/notes/:noteId', (req, res) => {
    Notes.deleteNote(req.params.noteId, req.params.userId).then((deletedNote) => {
        return res.status(201).json(deletedNote)
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

module.exports = router;