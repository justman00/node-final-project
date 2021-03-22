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

const getAll = async (userId) => {
    const notes = await Notes.find({user_id: userId}).exec();
    return notes;
}

const getById = async (noteId, userId) => {
    const note = await Notes.findById(noteId).where({user_id: userId}).exec();
    return note;
}

const deleteNote = (noteId, userId) => {
    return Notes.findByIdAndDelete(noteId).where({user_id: userId}).exec();
}

const editNote = (noteId, newInfo, userId) => {
    return Notes.findByIdAndUpdate(noteId, newInfo).where({user_id: userId}).exec();
}

const addNote = async (note) => {
    const newNote = await new Notes(note).save();
    return newNote;
}

module.exports = {
    getAll,
    getById,
    deleteNote,
    editNote,
    addNote
}