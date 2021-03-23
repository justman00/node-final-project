const express = require("express");
const router = express.Router();
const Notices = require("./notice-model");
const { restrictedAcces, validateNotice } = require("../middleware/middleware");

router.get("/", restrictedAcces, async (req, res, next) => {
  Notices.find()
    .populate("userId")
    .exec()
    .then((allNotice) => {
      res.status(200).json(allNotice);
    })
    .catch(next);
});

router.get("/:id", restrictedAcces, async (req, res, next) => {
  Notices.findById(req.params.id)
    .exec()
    .then((findNotice) => {
      res.status(200).json(findNotice);
    })
    .catch(next);
});

router.post("/", validateNotice, restrictedAcces, async (req, res, next) => {
  const newNotice = req.body;
  console.log("CORPUL", req.body);
  console.log("DECODED", req.decoded);
  new Notices({
    title: newNotice.title,
    text: newNotice.text,
    tag: newNotice.tag,
    userId: req.decoded.userId,
  })
    .save()
    .then((notice) => {
      res.status(200).json(notice);
    })
    .catch(next);
});

router.put("/:id", restrictedAcces, async (req, res, next) => {
  const updateNotice = req.body;

  Notices.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((updateNotice) => {
      res.status(200).json(updateNotice);
    })
    .catch(next);
});

router.delete("/:id", restrictedAcces, async (req, res, next) => {
  Notices.findByIdAndRemove(req.params.id, req.body)
    .exec()
    .then((removeNotice) => {
      res.status(200).json(removeNotice);
    })
    .catch(next);
});

module.exports = router;
