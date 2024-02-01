const router = require('express').Router();
const { createProperty, deleteProperty, getProperty, updateProperty, getAllProperties } = require('../controllers/property.controller')
const { ValidateObjectIdMiddleware, VerifyTokenMiddleware, } = require('../middleware')
// Get All Properties 
router.get('/', getAllProperties)
// Create Property 
router.route('/create')
    .post(VerifyTokenMiddleware, createProperty);
// Delete, Update, and Read Property
router.route('/:id')
    .delete(ValidateObjectIdMiddleware, VerifyTokenMiddleware, deleteProperty)
    .put(ValidateObjectIdMiddleware, VerifyTokenMiddleware, updateProperty)
    .get(ValidateObjectIdMiddleware, getProperty);

module.exports = router