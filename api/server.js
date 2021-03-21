if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@stepit-cluster.v8xqd.mongodb.net/Notes?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB, err");
  }
};

connectDB();
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const logger = require("./middleware/logger");
const error = require("./middleware/error");
const server = express();
const authRouter = require("./auth/router");
const usersRouter = require("./users/router");
const notesRouter = require("./notes/router");
const tagsRouter = require("./tags/router");

server.use(helmet());
server.use(cors());
server.use(logger("combined"));
server.use(express.json());
server.use(cookieParser());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/notes", notesRouter);
server.use("/api/tags", tagsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to notes app</h1>`);
});

server.use(error);
module.exports = server;
