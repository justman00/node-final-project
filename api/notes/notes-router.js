const express = require("express");

const Note = require("./notes-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const notes = await Note.get();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

router.get("/:note_id", async (req, res, next) => {
  try {
    const foundNote = await Note.getById(req.params.note_id);
    res.status(200).json(foundNote);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newNote = await Note.add(req.body);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
