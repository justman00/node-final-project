const express = require("express");
const router = express.Router();
const Notices = require("./notice-model");

router.get("/", async (req, res, next) => {
  Notices.find()
    .exec()
    .then((allNotice) => {
      res.status(200).json(allNotice);
    })
    .catch(next);

  //  res.status(200).json({ message: "succes" });
});

router.get("/:id", async (req, res, next) => {
  Notices.findById(req.params.id)
    .exec()
    .then((findNotice) => {
      res.status(200).json(findNotice);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  const newNotice = req.body;

  new Notices(newNotice)
    .save()
    .then((notice) => {
      res.status(200).json(notice);
    })
    .catch(next);
});

router.put("/:id", async (req, res, next) => {
  const updateNotice = req.body;

  Notices.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((updateNotice) => {
      res.status(200).json(updateNotice);
    })
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  Notices.findByIdAndRemove(req.params.id, req.body)
    .exec()
    .then((removeNotice) => {
      res.status(200).json(removeNotice);
    })
    .catch(next);
});

module.exports = router;
