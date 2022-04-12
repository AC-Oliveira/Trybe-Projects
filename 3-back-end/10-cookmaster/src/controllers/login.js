const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const errorHandler = (status, message) => ({ status, message });

const secret = 'mysecret';

const validateUser = async (email, password) => {
  const result = await usersModel.findUser(email);

  if (!result) throw errorHandler(401, 'Incorrect username or password');
  if (result.password !== password) throw errorHandler(401, 'Incorrect username or password');
  return result;
};

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw errorHandler(401, 'All fields must be filled');

    const { _id } = await validateUser(email, password);
    const jwtConfig = { algorithm: 'HS256' };
    const token = jwt.sign({ userId: _id }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};