const router = require('express').Router();
const { getUsers, updateUser } = require('../controllers/user.controller.js');
const { uniqueUser } = require('../middleware/uniqueUser.js');
const { verifyTokenAndUser } = require('../middleware/verifyToken.js');

router.get('/', getUsers)
router.put('/update/:id', verifyTokenAndUser, uniqueUser, updateUser)

module.exports = router