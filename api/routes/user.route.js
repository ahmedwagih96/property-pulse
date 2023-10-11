const router = require('express').Router();
const { getUsers, updateUser, deleteUser } = require('../controllers/user.controller.js');
const { uniqueUser } = require('../middleware/uniqueUser.js');
const { verifyTokenAndUser } = require('../middleware/verifyToken.js');
const { validateId } = require('../middleware/validateObjectId.js')
router.get('/', getUsers)
router.put('/update/:id', validateId, verifyTokenAndUser, uniqueUser, updateUser)
router.delete('/delete/:id', validateId, verifyTokenAndUser, deleteUser)

module.exports = router