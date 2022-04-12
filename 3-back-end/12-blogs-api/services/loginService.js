const CustomError = require('../errors/customError');
const loginError = require('../errors/loginErrors');
const { User } = require('../models');

const verifyLoginEmail = (email) => {
  if (email === '') throw new CustomError(loginError.emailEmpty);
  if (!email) throw new CustomError(loginError.emailRequired);
};

const verifyLoginPassword = (password) => {
  if (password === '') throw new CustomError(loginError.passwordEmpty);
  if (!password) throw new CustomError(loginError.passwordRequired);
};

const findUserByEmailAndPassword = async (email, password) => {
  verifyLoginPassword(password);
  verifyLoginEmail(email);

  const allUsers = await User.findAll();

  const specificUser = allUsers
    .find((user) => user.email === email && user.password === password);
  if (!specificUser) throw new CustomError(loginError.invalidFields);

  return specificUser; 
};

module.exports = { findUserByEmailAndPassword };