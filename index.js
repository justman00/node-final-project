if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./auth/router');
const notesRouter = require('./notes/router');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@stepit-cluster.cbszf.mongodb.net/notesApp?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/api/auth', authRouter);
server.use('/api/notes', notesRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to notes app</h1>`);
});

// error middleware
server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
