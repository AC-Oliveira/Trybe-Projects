const StatusCodes = require('http-status-codes');

module.exports = {
  titleRequired: { message: '"title" is required', status: StatusCodes.BAD_REQUEST },
  contentRequired: { message: '"content" is required', status: StatusCodes.BAD_REQUEST },
  categoryIdsRequired: { message: '"categoryIds" is required', status: StatusCodes.BAD_REQUEST },
  categoryIdNotFound: { message: '"categoryIds" not found', status: StatusCodes.BAD_REQUEST },
};