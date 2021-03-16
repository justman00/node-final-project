const mongoose = require("mongoose");

const schemaUser = mongoose.Schema({
  user_name: {
    type: String,
    require: true,
    unique: true,
  },

  user_email: {
    type: String,
    require: true,
    unique: true,
  },

  user_password: {
    type: String,
    require: true,
  },

  user_role: {
    require: true,
    type: String,
  },
});


const modelUser = mongoose.model('User',schemaUser);


module.exports = modelUser;

