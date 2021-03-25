const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: String,
    password: String,
   
});

const User = mongoose.model('User',usersSchema);

const notesSchema = new mongoose.Schema({
    title: String,
    content: String,
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    } 
})

const Notes = mongoose.model("Notes",notesSchema)

module.exports = {User,Notes}