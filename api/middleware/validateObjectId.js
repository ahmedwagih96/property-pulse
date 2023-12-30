const mongoose = require("mongoose")
const { BadRequestError } = require("../errors")

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new BadRequestError("Invalid Id")
    }
    next()
}

module.exports = { validateId }