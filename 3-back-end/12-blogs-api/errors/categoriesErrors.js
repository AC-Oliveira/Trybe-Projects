const StatusCodes = require('http-status-codes');

module.exports = {
  nameRequired: { message: '"name" is required', status: StatusCodes.BAD_REQUEST },
};