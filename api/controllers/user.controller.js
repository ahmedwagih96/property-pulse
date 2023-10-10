const bcryptjs = require('bcryptjs');
const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");

const getUsers = async (req, res) => {
    res.json("Hello World")
}

const updateUser = async (req, res) => {
    const updateFields = {
        username: req.body.username,
        email: req.body.email,
    };
    // Check if password is not an empty string before updating
    if (req.body.password) {
        updateFields.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Check if avatar is not an empty string before updating
    if (req.body.avatar !== undefined && req.body.avatar !== null && req.body.avatar !== "") {
        updateFields.avatar = req.body.avatar;
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id },
        { $set: updateFields },
        { new: true }).select("-password");
    res.status(StatusCodes.OK).json({ user: updatedUser, message: 'User updated Successfully', success: true })
}
module.exports = { getUsers, updateUser }