const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Notes = mongoose.model('Notes', NoteSchema);

const getAll = (userId) => {
    return Notes.find({user_id: userId}).exec();
}

const getById = (noteId, userId) => {
    return Notes.findById(noteId).where({user_id: userId}).exec();
}

const deleteNote = (noteId, userId) => {
    return Notes.findByIdAndDelete(noteId).where({user_id: userId}).exec();
}

const editNote = (noteId, newInfo, userId) => {

    return Notes.findByIdAndUpdate(noteId, newInfo).where({user_id: userId}).exec();
}

const addNote = (note) => {
    const newNote = new Notes(note);
    return newNote.save();
}

module.exports = {
    getAll,
    getById,
    deleteNote,
    editNote,
    addNote
}