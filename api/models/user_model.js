const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users', UserSchema);

const getByUserName = (user) => {
    return Users.findOne({username: user}).exec();
}

const getById = (userId) => {
    return Users.findById(userId).exec();
}

const deleteUser = (userId) => {
    return Users.findByIdAndDelete(noteId).exec();
}

const editUser = (userId, newInfo) => {
    return Users.findByIdAndUpdate(userId, newInfo).save();
}

const addUser = (user) => {
    const newUser = new Users(user);
    return newUser.save();
}

module.exports = {
    getByUserName,
    getById,
    deleteUser,
    editUser,
    addUser,
    Users
}


