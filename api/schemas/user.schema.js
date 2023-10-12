const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    }
}, {
    timestamps: true, toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Populate Properties that belong to this user 
UserSchema.virtual("properties", {
    ref: "Property",
    foreignField: "user",
    localField: "_id"
})
module.exports = { UserSchema }