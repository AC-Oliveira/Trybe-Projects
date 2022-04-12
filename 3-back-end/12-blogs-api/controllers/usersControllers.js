const StatusCodes = require('http-status-codes');
const userServices = require('../services/userServices');

const createNewUser = async (req, res, next) => {
  const user = req.body;
  try {
    const token = await userServices.createUserInDb(user);
    res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    const users = await userServices.findAllUsers(token);
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserByID = async (req, res, next) => {
  const { headers: { authorization: token }, params: { id } } = req;
  try {
    const user = await userServices.findUserById(token, id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewUser, getAllUsers, getUserByID };
