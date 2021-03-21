require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const routerNotices = require("./notices/notice-router");
const routerUsers = require("./users/users-router");
const routerAuth = require("./auth/auth-router");
const middleware = require("./middleware/middleware");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zxvho.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/api/auth", routerAuth);
server.use("/api/users", routerUsers);
server.use("/api/notices", routerNotices);
server.use(middleware.error);

// server.use(middleware.logger);

server.get("/", (req, res) => {
  res.send(`<h2>Testing my Api</h2>`);
});

module.exports = server;
