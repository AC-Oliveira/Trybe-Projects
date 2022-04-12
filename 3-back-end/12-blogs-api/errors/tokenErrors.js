const StatusCodes = require('http-status-codes');

module.exports = {
  tokenNotFound: { message: 'Token not found', status: StatusCodes.UNAUTHORIZED },
  invalidToken: { message: 'Expired or invalid token', status: StatusCodes.UNAUTHORIZED },
};
