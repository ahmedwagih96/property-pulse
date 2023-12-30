const router = require('express').Router();
const { signup, signin, google, signout, refreshToken } = require('../controllers/auth.controller.js');
const { verifyRefreshToken } = require('../middleware/verifyToken.js')
const { uniqueUser } = require('../middleware/uniqueUser.js')
router.post('/signup', uniqueUser, signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', verifyRefreshToken, signout);
router.get('/refresh', verifyRefreshToken, refreshToken);

module.exports = router