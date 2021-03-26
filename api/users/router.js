const express = require("express");

const { User } = require("./model");
const { validateUserId } = require("./middleware");
const { restrict } = require("../auth/middleware");

const router = express.Router();

router.put("/:user_id", restrict, validateUserId, async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username can not be empty." });
  }

  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (req.body[curr] && curr !== "password") {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.user_id,
      },
      bodyReducer,
    ).exec();
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:user_id", restrict, validateUserId, async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.user_id).exec();
    res.status(200).json(deletedUser);
    //res.clearCookie("token");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
