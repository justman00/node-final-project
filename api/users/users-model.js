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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const get = () => {
  return User.find().exec();
};

const getById = (user_id) => {
  return User.findById(user_id).exec();
};

const findBy = (filter) => {
  return User.findOne(filter).exec();
};

const add = (user) => {
  return new User(user).save();
};

const remove = (user_id) => {
  return User.findByIdAndDelete(user_id).exec();
};

const update = (user_id, updatedUser) => {
  return User.findByIdAndUpdate(user_id, updatedUser).exec();
};

module.exports = {
  get,
  getById,
  findBy,
  add,
  remove,
  update,
};
