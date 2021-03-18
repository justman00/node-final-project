const express = require('express');
const Notes = require('./../models/notes_model');
const { validateUserId } = require('./../middlewares/user_middleware');
const { validateNote, validateNoteId } = require('./../middlewares/note_middleware');

const router = express.Router();

router.post('/api/users/:userId/notes', validateUserId, validateNote, (req, res) => {
    Notes.addNote(req.body).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        console.log('route error: ', err)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

router.get('/api/users/:userId/notes', validateUserId, (req, res) => {
    Notes.getAll(req.params.userId).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        return res.status(500).json({msg: 'Something went wrong'})
    })
})

router.get('/api/users/:userId/notes/:noteId', validateUserId, validateNoteId, (req, res) => {
    return res.status(200).json(req.note);
})

router.delete('/api/users/:userId/notes/:noteId', validateUserId, validateNoteId, (req, res) => {
    Notes.deleteNote(req.params.noteId, req.params.userId).then((deletedNote) => {
        return res.status(201).json(deletedNote)
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
})

module.exports = router;