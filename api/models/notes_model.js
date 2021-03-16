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

const getAll = () => {
    return Notes.find().exec();
}

const getById = (noteId) => {
    return Notes.findById(noteId).exec();
}

const deleteNote = (noteId) => {
    return Notes.findByIdAndDelete(noteId).exec();
}

const editNote = (noteId, newInfo) => {

    return Notes.findByIdAndUpdate(noteId, newInfo).exec();
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