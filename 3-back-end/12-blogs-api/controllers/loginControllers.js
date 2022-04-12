const StatusCodes = require('http-status-codes');
const loginService = require('../services/loginService');
const { generateToken } = require('../auth/token');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await loginService.findUserByEmailAndPassword(email, password);
    const token = generateToken(user);

    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };