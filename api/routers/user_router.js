const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./../models/user_model");

const router = express.Router();

router.post("/", async (req, res) => {

 const newUser = {
     username: req.body.username,
     password: await bcrypt.hash(req.body.password, 14)
 }

  Users.addUser(newUser)
    .then((addesUser) => {
      return res.status(200).json(addesUser);
    })
    .catch((err) => {
      console.log("error on add: ", err);
      return res.status(500).json({
        msg: "Something went wrong",
      });
    });
});

router.get("/", (req, res) => {
  Users.getAll()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "Something went wrong",
      });
    });
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "Something went wrong",
      });
    });
});

module.exports = router;
