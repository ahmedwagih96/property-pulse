const router = require('express').Router();
const { updateUser, deleteUser, getUser } = require('../controllers/user.controller.js');
const { ValidateObjectIdMiddleware, UniqueUserMiddleware, VerifyTokenAndUserMiddleware } = require('../middleware')
router.get('/:id', ValidateObjectIdMiddleware, getUser)
router.put('/update/:id', ValidateObjectIdMiddleware, VerifyTokenAndUserMiddleware, UniqueUserMiddleware, updateUser)
router.delete('/delete/:id', ValidateObjectIdMiddleware, VerifyTokenAndUserMiddleware, deleteUser)

module.exports = router