const User = require("./users-model");

function validateUserId() {
  return (req, res, next) => {
    User.getById(req.params.user_id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ mesage: "User not found." });
        }
        req.user = user;
        next();
      })
      .catch(next);
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Missing required user data." });
    } else {
      return next();
    }
  };
}

module.exports = { validateUserId, validateUser };
