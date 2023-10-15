const router = require('express').Router();
const { createProperty, deleteProperty } = require('../controllers/property.controller')
const { verifyToken } = require('../middleware/verifyToken.js');
const { validateId } = require('../middleware/validateObjectId.js')
router.post('/create', verifyToken, createProperty);
router.route('/:id').delete(validateId, verifyToken, deleteProperty)

module.exports = router