const express = require("express");
const router = express.Router();
const Users = require("./users-model");
const {restrictedAcces} = require('../middleware/middleware');

router.get("/", restrictedAcces, async (req, res, next) => {
 console.log('Decoded', req.decoded);
  Users.find()
    .exec()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch(next);
});

router.get("/id", async (req, res, next) => {
  Users.findById()
    .exec()
    .then((findUser) => {
      res.status(200).json(findUser);
    })
    .catch(next);
});

router.put("/:id", async (req, res, next) => {
  Users.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((updateUser) => {
      res.status(200).json(updateUser);
    })
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  Users.findByIdAndRemove(req.params)
    .exec()
    .then((removeUser) => {
      res.status(200).json(removeUser);
    })
    .catch(next);
});

module.exports = router;
