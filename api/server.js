require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const routerNotices = require("./notices/notice-router");
const routerUsers = require("./users/users-router");
const middleware = require("./middleware/middleware");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zxvho.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);
server.use(express.json());
server.use("/api/notices", routerNotices);
server.use("api/users", routerUsers);
server.use(middleware.error);

// server.use(middleware.logger);


server.get("/", (req, res) => {
  res.send(`<h2>Testing my Api</h2>`);
});

module.exports = server;
