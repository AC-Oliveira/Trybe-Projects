const jwt = require('jsonwebtoken');
const userModel = require('../../models/usersModel');

const secret = 'mysecret';

const errorHandler = (status, message) => ({ status, message });

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw errorHandler(401, 'missing auth token');

    const decoded = jwt.verify(authorization, secret);

    const result = await userModel.findUserById(decoded.userId);

    req.user = result;

    next();
  } catch (err) {
    next({ message: err.message, status: 401 });
  }
};