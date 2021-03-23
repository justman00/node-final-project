const jwt = require("jsonwebtoken");
const Logs = require("../logs/logs-model");

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

const logger = (req, res, next) => {
  const date = new Date();
  console.log(date);
  // const log = await new Logs({
  //   client_name: req.headers["user-agent"],
  //   type_request: req.method,
  //   path_request: req.path,
  //   ip_adress_request: req.ip,
  //   date_request: date,
  // })
  // .save()
  // .catch((err) => {
  //   console.log(err);
  // });
  next();
};

module.exports = {
  error,
  logger,
  validateUser,
  validateNotice,
  restrictedAcces,
};
