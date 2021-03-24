const express = require("express");
const router = express.Router();
const Notices = require("./notice-model");
const { restrictedAcces, validateNotice } = require("../middleware/middleware");

router.get("/", restrictedAcces, async (req, res, next) => {
  Notices.find({ userId: req.decoded.user_id })
    .populate("userId")
    .exec()
    .then((allNotice) => {
      res.status(200).json(allNotice);
    })
    .catch(next);
});

router.get("/:id", restrictedAcces, async (req, res, next) => {
  Notices.find({ userId: req.decoded.user_id, _id: req.params.id })
    .exec()
    .then((findNotice) => {
      res.status(200).json(findNotice);
    })
    .catch(next);
});

router.post("/", validateNotice, restrictedAcces, async (req, res, next) => {
  const newNotice = req.body;
  new Notices({
    title: newNotice.title,
    text: newNotice.text,
    tag: newNotice.tag,
    userId: req.decoded.user_id,
  })
    .save()
    .then((notice) => {
      res.status(200).json(notice);
    })
    .catch(next);
});

router.put("/:id", restrictedAcces, async (req, res, next) => {
  const updateNotice = req.body;

  Notices.findOneAndUpdate(
    { _id: req.params.id, userId: req.decoded.user_id },
    req.body
  )
    .exec()
    .then((updateNotice) => {
      res.status(200).json(updateNotice);
    })
    .catch(next);
});

router.delete("/:id", restrictedAcces, async (req, res, next) => {
  Notices.findOneAndRemove(
    { _id: req.params.id, userId: req.decoded.user_id },
    req.body
  )
    .exec()
    .then((removeNotice) => {
      res.status(200).json(removeNotice);
    })
    .catch(next);
});

module.exports = router;
