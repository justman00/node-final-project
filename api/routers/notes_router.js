const express = require('express');
const Notes = require('./../models/notes_model');
const { validateUserId } = require('./../middlewares/user_middleware');
const { validateNote, validateNoteId } = require('./../middlewares/note_middleware');

const router = express.Router();

router.post('/api/users/:userId/notes', validateUserId, validateNote, (req, res, next) => {
    Notes.addNote(req.body).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        next(err);
    })
})

router.get('/api/users/:userId/notes', validateUserId, (req, res, next) => {
    Notes.getAll(req.params.userId).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        next(err);
    })
})

router.get('/api/users/:userId/notes/:noteId', validateUserId, validateNoteId, (req, res, next) => {
    return res.status(200).json(req.note);
})

router.delete('/api/users/:userId/notes/:noteId', validateUserId, validateNoteId, (req, res, next) => {
    Notes.deleteNote(req.params.noteId, req.params.userId).then((deletedNote) => {
        return res.status(201).json(deletedNote)
    }).catch((err) => {
        next(err);
    })
})

router.put('/api/users/:userId/notes/:noteId', validateUserId, validateNoteId, validateNote, (req, res, next) => {
    Notes.editNote(req.note._id, req.body, req.params.userId).then((updatedNote) => {
        return res.status(200).json(updatedNote)
    }).catch((err) => {
        next(err);
    })
})

module.exports = router;