const Notes = require('./../models/notes_model');

const validateNote = (req, res, next) => {
    if(!req.body.title && !req.body.content) {
        return res.status(400).json({
            msg: 'You must provide title or content'
        })
    }

    if(!req.body.title && req.body.content) {
        req.body.title = ' ';
    }
    else if(req.body.title && !req.body.content) {
        req.body.content = ' ';
    }
    next();
}

const validateNoteId = (req, res, next) => {
    Notes.getById(req.params.noteId, req.decoded.id).then((note) => {
        if(!note) {
            return res.status(400).json({msg: 'Note not found'}) 
        }
        else
        req.note = note;
        next();
           
    }).catch((error) => {
        next(error);
    })
}

module.exports = {
    validateNote,
    validateNoteId
}