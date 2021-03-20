const jwt = require('jsonwebtoken');

const validateUserBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password invalid' });
  }

  next();
};

const restrict = (req, res, next) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = { validateUserBody, restrict };
