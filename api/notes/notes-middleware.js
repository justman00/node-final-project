const Note = require("./notes-model");

function validateNoteId() {
  return (req, res, next) => {
    Note.getById(req.params.note_id)
      .then((note) => {
        if (!note) {
          return res.status(401).json({ message: "Note not found." });
        }
        req.note = note;
        next();
      })
      .catch(next);
  };
}

function validateNote() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Missing required note data." });
    } else {
      return next();
    }
  };
}

module.exports = { validateNoteId, validateNote };
