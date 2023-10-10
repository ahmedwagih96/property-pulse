const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
    }
}


// Verify Token & User 
function verifyTokenAndUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied' })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndUser }