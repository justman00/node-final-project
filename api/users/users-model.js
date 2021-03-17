const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const add = (user) => {
  return new User(user).save();
};

const findBy = (filter) =>{
  return User.findOne({filter}).exec();
}
module.exports = { add, findBy };
