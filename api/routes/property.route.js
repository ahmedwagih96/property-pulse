const router = require('express').Router();
const { createProperty, deleteProperty, getProperty, updateProperty, getAllProperties } = require('../controllers/property.controller')
const { verifyToken } = require('../middleware/verifyToken.js');
const { validateId } = require('../middleware/validateObjectId.js')

// Get All Properties 
router.get('/', getAllProperties)
// Create Property 
router.route('/create')
    .post(verifyToken, createProperty);
// Delete, Update, and Read Property
router.route('/:id')
    .delete(validateId, verifyToken, deleteProperty)
    .put(validateId, verifyToken, updateProperty)
    .get(validateId, getProperty);

module.exports = router