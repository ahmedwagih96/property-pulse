const ConflictError = require('../errors/conflict.error.js');
const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");
// Check if Unique User
async function UniqueUserMiddleware(req, res, next) {
    const { username, email } = req.body;
    let isUserNameTaken = await User.findOne({ username });
    if (isUserNameTaken && isUserNameTaken.id !== req.params.id) {
        throw new ConflictError(`${username} is already used by another user`)
    }
    // Check if the email is taken
    let isEmailTaken = await User.findOne({ email });
    if (isEmailTaken && isEmailTaken.id !== req.params.id) {
        throw new ConflictError(`${email} is already used by another user`)
    }
    next()
}

module.exports = UniqueUserMiddleware