const { VerifyTokenMiddleware, VerifyTokenAndUserMiddleware, VerifyRefreshTokenMiddleware
} = require('./authentication.middleware.js')
const ErrorHandlerMiddleware = require('./error.middleware.js')
const NotFoundMiddleware = require('./notFound.middleware.js')
const UniqueUserMiddleware = require('./uniqueUser.middleware.js')
const ValidateObjectIdMiddleware = require('./validateObjectId.middleware.js')
module.exports = {
    ErrorHandlerMiddleware,
    NotFoundMiddleware,
    UniqueUserMiddleware,
    ValidateObjectIdMiddleware,
    VerifyTokenMiddleware, VerifyTokenAndUserMiddleware, VerifyRefreshTokenMiddleware
}