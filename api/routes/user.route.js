const router = require('express').Router();
const {getUsers} = require('../controllers/user.controller.js')

router.get('/', getUsers)

module.exports = router