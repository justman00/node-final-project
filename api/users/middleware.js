const validateUserId = (req, res, next) => {
  if (req.params.user_id !== req.decoded.user_id) {
    return res.status(403).json({ message: "Forbidden." });
  } else {
    next();
  }
};

module.exports = {validateUserId};
