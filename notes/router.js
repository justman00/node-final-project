const express = require('express');
const { Note } = require('./model');
const { restrict } = require('../auth/middlewares');

const router = express.Router();

router.get('/', restrict, async (req, res, next) => {
  // sa extraga lista de notite
  // [a, b, c, d, e, f, g]
  // .limit(3)
  // page 1 => 3
  // page 2 => 3
  // page 3 => 3

  // .skip(0)
  // page 1 => a, b
  // page 2 => c, d,
  // page 3 => e, f
  try {
    const notes = await Note.find({ user: req.decoded.id })
      .limit(2)
      .skip(2 * (Number(req.query.page) - 1))
      .exec();

    res.status(200).json({ notes });
  } catch (error) {
    next(error);
  }
});

router.post('/', restrict, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.decoded.id;

    const addedNote = await new Note({ title, content, user: userId }).save();
    res.status(201).json(addedNote);
  } catch (error) {
    next(error);
  }
});

router.get('/:noteId', restrict, async (req, res, next) => {
  try {
    const foundNote = await Note.findOne({
      _id: req.params.noteId,
      user: req.decoded.id,
    }).exec();

    if (!foundNote) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json(foundNote);
  } catch (error) {
    next(error);
  }
});

// PUT /:id
router.put('/:noteId', restrict, async (req, res, next) => {
  const cleanedBody = Object.keys(req.body).reduce((acc, curr) => {
    if (req.body[curr] && curr !== 'user') {
      acc[curr] = req.body[curr];
    }

    return acc;
  }, {});

  try {
    await Note.findOneAndUpdate(
      {
        _id: req.params.noteId,
        user: req.decoded.id,
      },
      cleanedBody
    ).exec();

    res.status(201).json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

// DELETE /:id
router.delete('/:noteId', restrict, async (req, res, next) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.noteId,
      user: req.decoded.id,
    }).exec();

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
