const express = require("express");

const Note = require("./notes-model");
const { Tag } = require("./notes-model");
const { validateNoteId, validateNote } = require("./notes-middleware");
const { restricted } = require("../auth/auth-middleware");

const router = express.Router();

router.get("/", restricted, async (req, res, next) => {
  try {
    const notes = await Note.getUserNotes(req.decoded.user_id);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:note_id",
  restricted,
  validateNoteId(),
  async (req, res, next) => {
    try {
      const foundNote = await Note.getUserNote(
        req.decoded.user_id,
        req.params.note_id,
      );
      res.status(200).json(foundNote);
    } catch (err) {
      next(err);
    }
  },
);

router.post("/", restricted, validateNote(), async (req, res, next) => {
  try {
    const newNote = await Note.add({
      ...req.body,
      user_id: req.decoded.user_id,
    });
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

////// add a tag to your note /////
router.post("/tags", restricted, validateNote(), async (req, res, next) => {
  try {
    const newTag = await new Tag(req.body).save();

    const updatedNote = await Promise.all(
      newTag.notes.map((note_id) => {
        return Note.updateOne(note_id, newTag._id);
      }),
    );
    res.json({ newTag, updatedNote });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:note_id",
  restricted,
  validateNote(),
  validateNoteId(),
  async (req, res, next) => {
    try {
      const updatedNote = await Note.update(req.params.note_id, req.body);
      res.status(200).json(updatedNote);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  "/:note_id",
  restricted,
  validateNoteId(),
  async (req, res, next) => {
    try {
      const deletedNote = await Note.remove(req.params.note_id);
      res.status(200).json(deletedNote);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
