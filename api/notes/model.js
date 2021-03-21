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
    user: {
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
  name: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Note, Tag };
