const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");
// Check if Unique User
async function uniqueUser(req, res, next) {
    const { username, email } = req.body;
    let isUserNameTaken = await User.findOne({ username });
    if (isUserNameTaken && isUserNameTaken.id !== req.params.id) {
        return res.status(StatusCodes.CONFLICT).json({ message: `${username} is already used by another user`, success: false })
    }
    // Check if the email is taken
    let isEmailTaken = await User.findOne({ email });
    if (isEmailTaken && isEmailTaken.id !== req.params.id) {
        return res.status(StatusCodes.CONFLICT).json({ message: `${email} is already used by another account`, success: false })
    }
    next()
}

module.exports = { uniqueUser }