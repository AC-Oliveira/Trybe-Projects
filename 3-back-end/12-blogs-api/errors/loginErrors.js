const StatusCodes = require('http-status-codes');

module.exports = {
  passwordRequired: { message: '"password" is required', status: StatusCodes.BAD_REQUEST },
  passwordEmpty: { message: '"password" is not allowed to be empty',
    status: StatusCodes.BAD_REQUEST },
  emailRequired: { message: '"email" is required', status: StatusCodes.BAD_REQUEST },
  emailEmpty: { message: '"email" is not allowed to be empty', status: StatusCodes.BAD_REQUEST },
  invalidFields: { message: 'Invalid fields', status: StatusCodes.BAD_REQUEST },
};