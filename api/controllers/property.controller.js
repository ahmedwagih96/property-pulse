const { StatusCodes } = require('http-status-codes');
const { Property } = require('../models/property.model')
const createProperty = async (req, res) => {
    const property = await Property.create({ ...req.body, user: req.user.id });
    return res.status(StatusCodes.CREATED).json({ property, success: true })
}

module.exports = { createProperty }