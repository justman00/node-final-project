const express = require("express");

const { Note } = require("./model");
const { validateNote, checkNoteExists } = require("./middleware");
const { restrict } = require("../auth/middleware");

const router = express.Router();

router.get("/", restrict, async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.decoded.user_id })
      .populate("tags")
      .exec();

    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

router.get("/:note_id", restrict, checkNoteExists, async (req, res, next) => {
  try {
    const userNote = await Note.findOne({
      user: req.decoded.user_id,
      _id: req.params.note_id,
    })
      .populate("tags")
      .exec();
    res.status(200).json(userNote);
  } catch (err) {
    next(err);
  }
});

router.post("/", restrict, validateNote, async (req, res, next) => {
  try {
    const newNote = await new Note({
      ...req.body,
      user: req.decoded.user_id,
    }).save();
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:note_id",
  restrict,
  validateNote,
  checkNoteExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "user") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});

    try {
      const updatedNote = await Note.findOneAndUpdate(
        {
          _id: req.params.note_id,
          user: req.decoded.user_id,
        },
        bodyReducer,
      ).exec();
      res.status(200).json(updatedNote);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  "/:note_id",
  restrict,
  checkNoteExists,
  async (req, res, next) => {
    try {
      const deletedNote = await Note.findOneAndDelete({
        _id: req.params.note_id,
        user: req.decoded.user_id,
      }).exec();
      res.status(200).json(deletedNote);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
