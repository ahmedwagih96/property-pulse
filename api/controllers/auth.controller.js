const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes")
const bcryptjs = require('bcryptjs')

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    // Check if the username is taken
    let isUserNameTaken = await User.findOne({ username });
    if (isUserNameTaken) {
        return res.status(StatusCodes.CONFLICT).json({ message: `${username} is already used by another user`, success: false })
    }
    // Check if the email is taken
    let isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
        return res.status(StatusCodes.CONFLICT).json({ message: `${email} is already used by another account`, success: false })
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(StatusCodes.CREATED).json({ message: 'User Created Successfully', success: true })
}

module.exports = { signup }