const router = require('express').Router();
const { signup, signin, google, signout, refreshToken } = require('../controllers/auth.controller.js');
const { UniqueUserMiddleware, VerifyRefreshTokenMiddleware } = require('../middleware')
router.post('/signup', UniqueUserMiddleware, signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', VerifyRefreshTokenMiddleware, signout);
router.get('/refresh', VerifyRefreshTokenMiddleware, refreshToken);

module.exports = router