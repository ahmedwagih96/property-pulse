const router = require('express').Router();
const { createProperty, deleteProperty, getProperty, updateProperty } = require('../controllers/property.controller')
const { verifyToken } = require('../middleware/verifyToken.js');
const { validateId } = require('../middleware/validateObjectId.js')

// create 
router.route('/create')
    .post(verifyToken, createProperty);
// delete
router.route('/:id')
    .delete(validateId, verifyToken, deleteProperty)
    .put(validateId, verifyToken, updateProperty)
    .get(validateId, getProperty);

module.exports = router