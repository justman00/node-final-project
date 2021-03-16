const express = require('express');
const mongoose = require('mongoose');
const server = express();

const userRouter = require('./routers/user_router');
const noteRouter = require('./routers/notes_router');

const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.7j4py.mongodb.net/NotesDB?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      console.log("MongoDB connected!!");
    } catch (err) {
      console.log("Failed to connect to MongoDB", err);
    }
  };
  connectDB();

server.use(express.json())
server.use('/api/users/:id/notes', noteRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to notes app</h1>`);
});

module.exports = server;