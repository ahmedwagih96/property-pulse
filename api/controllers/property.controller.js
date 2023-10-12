const { StatusCodes } = require('http-status-codes');
const {Property} = require('../models/property.model')
const createProperty = async (req, res) => {
    const property = await Property.create({...req.body});
    return res.status(StatusCodes.CREATED).json(property)
}

module.exports = { createProperty }