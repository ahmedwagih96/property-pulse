const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes")
const bcryptjs = require('bcryptjs')
const RefreshToken = require('../models/refreshToken.model.js');
const { createAccessToken, createRefreshToken, validateRefreshToken } = require('../utils/tokens.js');

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
    await newUser.save();

    const user = await User.findOne({ email }).populate("properties");

    // Create Access and Refresh Tokens 
    const refreshToken = new RefreshToken({ owner: user._id });
    await refreshToken.save()

    // generate the token
    const access_token = createAccessToken(user._id);
    const refresh_token = createRefreshToken(user._id, refreshToken._id);

    // response to client
    res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    return res.status(StatusCodes.OK).json({ message: 'Signed Up Successfully', user, success: true, access_token })
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `${email} is not found!`, success: false })
    }

    // validate the password
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: `Wrong Credentials`, success: false })
    }

    // Create Access and Refresh Tokens 
    const refreshToken = new RefreshToken({ owner: user._id });
    await refreshToken.save()

    // generate the token
    const access_token = createAccessToken(user._id);
    const refresh_token = createRefreshToken(user._id, refreshToken._id)

    user = await User.findOne({ email }).populate("properties");

    // response to client
    res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    return res.status(StatusCodes.OK).json({ message: 'Signed In Successfully', user, success: true, access_token })

}

const google = async (req, res) => {
    // Find if user already exists 
    const user = await User.findOne({ email: req.body.email }).populate("properties")
    // If user exists (sign in the user)
    if (user) {
        // Create Access and Refresh Tokens 
        const refreshToken = new RefreshToken({ owner: user._id });
        await refreshToken.save()

        // generate the token
        const access_token = createAccessToken(user._id);
        const refresh_token = createRefreshToken(user._id, refreshToken._id)
        // response to client
        res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        return res.status(StatusCodes.OK).json({ message: 'Signed In Successfully', user, success: true, access_token })

    } else {
        const { name, photo, email } = req.body;
        // generate random password for the user
        const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
        // hash the password
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        // create the new user
        const username = name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4);
        let newUser = new User({
            username,
            email,
            password: hashedPassword,
            avatar: photo
        });
        await newUser.save();
        newUser = await User.findOne({ email })
        // Create Access and Refresh Tokens 
        const refreshToken = new RefreshToken({ owner: newUser._id });
        await refreshToken.save()

        // generate the token
        const access_token = createAccessToken(newUser._id);
        const refresh_token = createRefreshToken(newUser._id, refreshToken._id)
        // response to client
        res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        // response to client
        return res.cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true }).status(StatusCodes.OK).json({ message: 'User Created Successfully', user: newUser, success: true, access_token })
    }
}

const signout = async (req, res) => {
    const currentRefreshToken = req.decodedToken
    await RefreshToken.deleteOne({ _id: currentRefreshToken.tokenId })

    return res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }).status(200)
        .json({ success: true, message: 'User logged out successfully' })
}

const refreshToken = async (req, res) => {
    const currentRefreshToken = req.decodedToken
    const newRefreshToken = new RefreshToken({ owner: currentRefreshToken.userId });
    await newRefreshToken.save();
    await RefreshToken.deleteOne({ _id: currentRefreshToken.tokenId })

    // generate the token
    const access_token = createAccessToken(currentRefreshToken.userId);
    const refresh_token = createRefreshToken(currentRefreshToken.userId, newRefreshToken._id);

    res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    return res.json({ access_token, success: true })
}





module.exports = { signup, signin, google, signout, refreshToken }