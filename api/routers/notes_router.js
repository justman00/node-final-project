const express = require('express');
const Notes = require('./../models/notes_model');
const { validateUserId, restrictUser, checkToken } = require('./../middlewares/user_middleware');
const { validateNote, validateNoteId } = require('./../middlewares/note_middleware');

const router = express.Router();

router.post('/:userId/notes', validateUserId, validateNote, checkToken, (req, res, next) => {

    const {title, content} = req.body;
    const userId = req.decoded.id;

    const newNote = {
        title,
        content,
        user_id: userId
    }

    Notes.addNote(newNote).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        next(err);
    })
})

router.get('/:userId/notes', validateUserId, restrictUser(), checkToken, (req, res, next) => {
    Notes.getAll(req.decoded.id).then((notes) => {
        return res.status(200).json(notes)
    }).catch((err) => {
        next(err);
    })
})

router.get('/:userId/notes/:noteId', validateUserId, checkToken, validateNoteId, (req, res, next) => {
    return res.status(200).json(req.note);
})

router.delete('/:userId/notes/:noteId', validateUserId, validateNoteId, (req, res, next) => {
    Notes.deleteNote(req.params.noteId, req.params.userId).then((deletedNote) => {
        return res.status(201).json(deletedNote)
    }).catch((err) => {
        next(err);
    })
})

router.put('/:userId/notes/:noteId', validateUserId, checkToken, validateNoteId, (req, res, next) => {
    const cleanedBody = Object.keys(req.body).reduce((acc, curr) => {
        if (req.body[curr] && curr !== 'user_id') {
          acc[curr] = req.body[curr];
        }
    
        return acc;
      }, {});

    Notes.editNote(req.note._id, cleanedBody, req.params.userId).then((updatedNote) => {
        return res.status(200).json({msg: 'Note was updated'})
    }).catch((err) => {
        next(err);
    })
})

module.exports = router;