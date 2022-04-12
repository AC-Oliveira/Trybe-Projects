const userModel = require('../models/usersModel');

const errorHandler = (status, message) => ({ status, message });

const regEx = '^[^@]+@[^@]{2,}.[^@]{2,}$';

const validateUser = (user) => {
  const { name, email, password } = user;
  if (!name || !email || !password) throw errorHandler(400, 'Invalid entries. Try again.');
  if (!email.match(regEx)) throw errorHandler(400, 'Invalid entries. Try again.');
};

const createUser = async (user) => {
  validateUser(user);
  const userExists = await userModel.findUser(user.email);
  if (userExists) throw errorHandler(409, 'Email already registered');
  const result = await userModel.createUser(user);
  return result;
};

module.exports = { createUser };
