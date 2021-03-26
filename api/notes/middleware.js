const { Note } = require("./model");

const validateNote = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Missing required fields." });
  } else {
    return next();
  }
};

const checkNoteExists = async (req, res, next) => {
  try {
    const foundNote = await Note.findById(req.params.note_id);
    if (!foundNote) {
      return res.status(404).json({ message: "Not found." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { validateNote, checkNoteExists };
