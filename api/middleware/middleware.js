const jwt = require("jsonwebtoken");

const error = (err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    message: "Something went wrong. Please try again",
  });
};
const validateUser = (req, res, next) => {
  if (!req.body.user_name || !req.body.user_password || !req.body.user_email) {
    return res.status(400).json({ message: "Oops,Something went wrong:( " });
  }
  next();
};

const validateNotice = (req, res, next) => {
  if (!req.body.title || !req.body.text || !req.body.tag) {
    return res.status(400).json({ message: "Oops,Something went wrong:( " });
  }
  next();
};

const restrictedAcces = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SingIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    err
      ? res.status(401).json({ message: 'Token invalid, please SingIn !!!" ' })
      : (req.decoded = decoded),
      next();
  });
};

module.exports = {
  error,
  validateUser,
  validateNotice,
  restrictedAcces,
};
