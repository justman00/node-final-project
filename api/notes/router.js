const express = require("express");

const { Note, Tag } = require("./model");
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

router.post("/tags", restrict, async (req, res, next) => {
  try {
    const { name, notes } = req.body;
    const foundTag = await Tag.findOne({ name }).exec();
    const foundNote = await Note.findById({ _id: notes }).exec();

    if (!foundTag) {
      const newTag = await new Tag(req.body).save();
      const updatedNote = await Promise.all(
        Note.updateOne(
          {
            _id: foundNote._id,
            user: req.decoded.user_id,
          },
          {
            $push: { tags: newTag._id },
          },
          { upsert: true },
        ),
      );

      return res.status(201).json({ newTag, updatedNote });
    } else {
      /*foundNote.tags.map((tag_id) => {
        if (tag_id === foundTag._id) {
          return res.json({ message: "Tag already added to this Note." });
        }
      });*/
      
      const updatedNote = await Promise.all(
        Note.updateOne(
          {
            _id: foundNote._id,
            user: req.decoded.user_id,
          },
          {
            $push: { tags: foundTag._id },
          },
          { upsert: true },
        ),
      );
      return res.status(200).json({ foundTag, updatedNote });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
