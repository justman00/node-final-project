const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  tag: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const noticeModel = mongoose.model("Notice", noticeSchema);

module.exports = noticeModel;
