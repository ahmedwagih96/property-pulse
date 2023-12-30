const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');
const { UnauthorizedError, UnauthenticatedError } = require('../errors');

const VerifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new UnauthenticatedError("Access Denied")
    }
    const access_token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(access_token, process.env.JWT_SECRET);
        req.user = payload
        next();
    } catch (error) {
        throw new UnauthenticatedError("Access Denied")
    }
}


// Verify Token & User 
function VerifyTokenAndUserMiddleware(req, res, next) {
    VerifyTokenMiddleware(req, res, () => {
        if (req.user.userId === req.params.id) {
            next();
        } else {
            throw new UnauthorizedError("Access Denied")
        }
    })
}

async function VerifyRefreshTokenMiddleware
(req, res, next) {
    const token = req.cookies.jwt
    if (!token) {
        throw new UnauthenticatedError("Access Denied")
    }
    const decodeToken = (token) => {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            throw new UnauthenticatedError("Access Denied")
        }
    }
    const decodedToken = decodeToken(token);
    const tokenExists = await RefreshToken.find({ _id: decodedToken.tokenId, owner: decodedToken.userId });
    if (tokenExists) {
        req.decodedToken = decodedToken;
        next()
    } else {
        throw new UnauthenticatedError("Access Denied")
    }
}

module.exports = { VerifyTokenMiddleware, VerifyTokenAndUserMiddleware, VerifyRefreshTokenMiddleware
 }