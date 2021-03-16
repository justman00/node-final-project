const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

const Note = mongoose.model('Note', NoteSchema);

const getAll = async () => {
    const notes = await Note.find().exec();
    return notes;
}

const getById = async (noteId) => {
    const reqNote = await Note.findById(noteId).exec();
    return reqNote;
}

const deleteNote = async (noteId) => {
    const deletedNote = await Note.findByIdAndDelete(noteId).exec();
    return deletedNote;
}

const editNote = async (noteId, newInfo) => {

    const newNote = newInfo;
    const modifiedNote = await Note.findByIdAndUpdate(noteId, newNote).save();
    return modifiedNote;
}

/*const addNote = async (note) => {
    const newNote = note;
    const addedNote = await 
}*/

module.exports = {
    getAll,
    getById,
    deleteNote,
    editNote
}