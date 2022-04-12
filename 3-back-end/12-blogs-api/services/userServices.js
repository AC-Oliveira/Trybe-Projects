const { User } = require('../models');
const { generateToken } = require('../auth/token');
const utils = require('./utils/utils');
const CustomError = require('../errors/customError');
const userErrors = require('../errors/userErrors');

const findAllUsers = async (token) => {
  utils.verifyToken(token);
  const allUsers = await User
  .findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return allUsers;
};

const findUserById = async (token, id) => {
  utils.verifyToken(token);
  const allUsers = await User.findAll();
  const specificUser = allUsers.find((user) => user.id === Number(id));
  if (!specificUser) throw new CustomError(userErrors.userNotFound);
  return specificUser;
};

const createUserInDb = async (user) => {
  const isEmailRegistered = await utils.emailExistsInDB(user.email);
  if (isEmailRegistered) throw new CustomError(userErrors.userAlreadyRegistered);
  utils.verifyEmailValidity(user.email);
  utils.displayNameVeriFy(user.displayName);
  utils.verifyPassword(user.password);
  const { dataValues } = await User.create({ ...user });
  const token = generateToken(dataValues);
  return token;
};

module.exports = { findAllUsers, createUserInDb, findUserById };
