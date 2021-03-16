const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

const getAll = async () => {
    const users = await User.find().exec();
    return users;
}

const getById = async (userId) => {
    const reqUser = await User.findById(userId).exec();
    return reqUser;
}

const deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(noteId).exec();
    return deletedUser;
}

const editUser = async (userId, newInfo) => {

    const newUser = newInfo;
    const modifiedUser = await User.findByIdAndUpdate(userId, newUser).save();
    return modifiedUser;
}

/*const addNote = async (note) => {
    const newNote = note;
    const addedNote = await 
}*/

module.exports = {
    getAll,
    getById,
    deleteUser,
    editUser
}


