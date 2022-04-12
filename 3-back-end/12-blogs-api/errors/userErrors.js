const StatusCodes = require('http-status-codes');

const userErrors = {
  displayNameLengthInvalid: { message: '"displayName" length must be at least 8 characters long',
    status: StatusCodes.BAD_REQUEST },
  invalidEmail: { message: '"email" must be a valid email', status: StatusCodes.BAD_REQUEST },
  emailRequired: { message: '"email" is required', status: StatusCodes.BAD_REQUEST },
  invalidPasswordLength: { message: '"password" length must be 6 characters long',
    status: StatusCodes.BAD_REQUEST },
  passwordRequired: { message: '"password" is required', status: StatusCodes.BAD_REQUEST },
  userAlreadyRegistered: { message: 'User already registered', status: StatusCodes.CONFLICT },
  userNotFound: { message: 'User does not exist', status: StatusCodes.NOT_FOUND },
};

module.exports = userErrors;