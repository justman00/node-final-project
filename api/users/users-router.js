const express = require("express");

const User = require("./users-model");

const { validateUserId, validateUser } = require("./users-middleware");
const { restricted } = require("../auth/auth-middleware");

const router = express.Router();

router.get("/", restricted, (req, res, next) => {
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:user_id", restricted, validateUserId(), (req, res, next) => {
  res.status(200).json(req.user);
});

router.put("/:user_id", restricted, validateUser(), (req, res, next) => {
  User.update(req.params.user_id, req.body)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch(next);
});

router.delete("/:user_id", restricted, (req, res, next) => {
  User.remove(req.params.user_id)
    .then((deletedUser) => {
      res.status(200).json(deletedUser);
    })
    .catch(next);
});

module.exports = router;
