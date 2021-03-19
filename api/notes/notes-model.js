const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", noteSchema);

const tagSchema = new mongoose.Schema({
  text: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const Tag = mongoose.model("Tag", tagSchema);

const add = (note) => {
  return new Note(note).save();
};

const remove = (note_id) => {
  return Note.findByIdAndDelete(note_id).exec();
};

const update = (note_id, updatedNote) => {
  return Note.findByIdAndUpdate(note_id, updatedNote).exec();
};

const updateOne = (note_id, tag_id) => {
  return Note.updateOne(
    { _id: note_id },
    {
      $push: {
        tags: tag_id,
      },
    },
    { upsert: true },
  ).exec();
};

const getUserNotes = (userId) => {
  return Note.find({ user_id: userId }).populate("tags").exec();
};

const getUserNote = (userId, noteId) => {
  return Note.find({ user_id: userId, _id: noteId }).populate("tags").exec();
};

module.exports = {
  Tag,
  add,
  remove,
  update,
  updateOne,
  getUserNotes,
  getUserNote,
};
