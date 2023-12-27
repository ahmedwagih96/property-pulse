const bcryptjs = require('bcryptjs');
const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");
const { Property } = require('../models/property.model.js');

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).populate({
        path: 'properties',
        options: { sort: { createdAt: -1 } },
        populate: { path: 'user'}
    });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" })
    }
    res.status(StatusCodes.OK).json({ user, success: true })
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
        { new: true })
    res.status(StatusCodes.OK).json({ user: updatedUser, message: 'User updated Successfully', success: true })
}

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" })
    }
    // Delete all Properties created by the user 
    await Property.deleteMany({ user: user._id })
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token')
    res.status(StatusCodes.OK).json({ message: 'User deleted Successfully', success: true })

}
module.exports = { getUser, updateUser, deleteUser }