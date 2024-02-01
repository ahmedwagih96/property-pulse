const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const ErrorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res
        .status(res.statusCode ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message ? err.message : 'Something went wrong try again later')
}

module.exports = ErrorHandlerMiddleware 
