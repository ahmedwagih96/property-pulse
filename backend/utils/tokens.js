const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const RefreshToken = require('../models/refreshToken.model');

function createAccessToken(userId) {
    return jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });
}

function createRefreshToken(userId, refreshTokenId) {
    return jwt.sign({
        userId: userId,
        tokenId: refreshTokenId
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d'
    });
}

const validateRefreshToken = async (token) => {

    const decodedToken = decodeToken(token);
    const tokenExists = await RefreshToken.find({ _id: decodedToken.tokenId, owner: decodedToken.userId });
    if (tokenExists) {
        return decodedToken;
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
};

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
}


module.exports = { createAccessToken, createRefreshToken, validateRefreshToken }