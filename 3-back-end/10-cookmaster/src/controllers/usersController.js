const usersServices = require('../services/usersService');

const createUser = async (req, res, next) => {
  const user = req.body;
  try {
    user.role = 'user';
    const result = await usersServices.createUser(user);
    delete user.password;
    res.status(201).json({ user, result });  
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
