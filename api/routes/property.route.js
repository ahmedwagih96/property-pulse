const router = require('express').Router();
const { createProperty } = require('../controllers/property.controller')
const { verifyToken } = require('../middleware/verifyToken.js');
router.post('/create', verifyToken, createProperty);

module.exports = router