const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
    // hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    // response to client
    res.status(StatusCodes.CREATED).json({ message: 'User Created Successfully', success: true })
}


const signin = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `${email} is not found!`, success: false })
    }
    // validate the password
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: `Wrong Credentials`, success: false })
    }
    // generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user = await User.findOne({ email }).select("-password")
    // response to client
    res.cookie('access_token', token, { httpOnly: true }).status(StatusCodes.OK).json({ message: 'Signed In Successfully', user, success: true })

}
module.exports = { signup, signin }