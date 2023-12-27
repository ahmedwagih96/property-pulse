const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
    const access_token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(access_token, process.env.JWT_SECRET);
        req.user = payload
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
}


// Verify Token & User 
function verifyTokenAndUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userId === req.params.id) {
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
        }
    })
}

async function verifyRefreshToken(req, res, next) {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
    const decodeToken = (token) => {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
        }
    }
    const decodedToken = decodeToken(token);
    const tokenExists = await RefreshToken.find({ _id: decodedToken.tokenId, owner: decodedToken.userId });
    if (tokenExists) {
        req.decodedToken = decodedToken;
        next()
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
}

module.exports = { verifyToken, verifyTokenAndUser, verifyRefreshToken }