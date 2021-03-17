const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Note = mongoose.model("Note", noteSchema);

const get = () => {
  return Note.find().exec();
};

const getById = (note_id) => {
  return Note.findById(note_id).exec();
};

const add = (note) => {
  return new Note(note).save();
};

const remove = (note_id) => {
  return Note.findByIdAndDelete(note_id).exec();
};

const update = (note_id, updatedNote) => {
  return Note.findByIdAndUpdate(note_id, updatedNote).exec();
};

module.exports = { get, getById, add, remove, update };
