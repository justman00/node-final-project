const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cookieParser = require('cookie-parser');

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

server.use(express.json());
server.use(cookieParser());
server.use('/api/users', noteRouter);
server.use('/api', userRouter);

server.use((err, req, res, next) => { //error middleware
  console.log('error middleware: ',err)
  return res.status(500).json({
    msg: 'Something went wrong'
  })
})

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to notes app</h1>`);
});

module.exports = server;