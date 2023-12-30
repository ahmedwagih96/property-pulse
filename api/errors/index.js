const CustomAPIError = require('./custom.error.js')
const BadRequestError = require('./badRequest.error.js')
const UnauthenticatedError = require('./unauthenticated.error.js')
const UnauthorizedError = require('./unauthorized.error.js')
const ConflictError = require('./conflict.error.js');
const NotFoundError = require('./notFound.error.js')
module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  ConflictError,
  NotFoundError
}
