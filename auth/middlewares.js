const validateUserBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password invalid' });
  }

  next();
};

module.exports = { validateUserBody };
