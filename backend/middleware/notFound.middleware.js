const { StatusCodes } = require("http-status-codes")

const NotFoundMiddleware = (req, res, next) => {
    const error = new Error(`not found - ${req.originalUrl}`)
    res.status(StatusCodes.NOT_FOUND)
    next(error)
}

module.exports = NotFoundMiddleware