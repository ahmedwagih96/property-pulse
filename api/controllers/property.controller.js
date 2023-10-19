const { StatusCodes } = require('http-status-codes');
const { Property } = require('../models/property.model')
const { User } = require('../models/user.model.js');


const getAllProperties = async (req, res) => {
    const { parking, furnished, type, sort, searchName, startIndex } = req.query;

    const queries = {}
    if (parking) queries.parking = true
    if (furnished) queries.furnished = true
    if (type) queries.type = type
    if (searchName) queries.name = { $regex: searchName, $options: 'i' }

    let results = Property.find(queries);

    const limit = Number(req.query.limit) || 9;
    const skip = Number(startIndex) || 0;

    sort ? results.sort(sort)
        : results.sort('createdAt')

    results = results.limit(limit).skip(skip)

    const properties = await results.populate("user", ['-password']);

    return res.status(StatusCodes.OK).json({ success: true, properties })

}

const getProperty = async (req, res) => {
    const property = await Property.findById(req.params.id).select(['-_id', '-createdAt', '-updatedAt', '-__v']).populate("user", ['-password'])
    if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Property not found' })
    }
    return res.status(StatusCodes.OK).json({ success: true, property })
}
const createProperty = async (req, res) => {
    const property = await Property.create({ ...req.body, user: req.user.id });
    const user = await User.findById(req.user.id).populate("properties");
    return res.status(StatusCodes.CREATED).json({ user, success: true, property })
}

const deleteProperty = async (req, res) => {
    // Validate the property
    const property = await Property.findById(req.params.id);
    if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Property not found' })
    }
    // Check if post owner is the one deleting the property
    if (req.user.id === property.user.toString()) {
        // Delete The Property
        await Property.findByIdAndDelete(req.params.id);
        // Get the updated Listings back 
        const user = await User.findById(req.user.id).populate("properties");
        // response to client 
        return res.status(StatusCodes.OK).json({ message: 'Listing has been deleted', success: true, user })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Access Denied' })
    }
}

const updateProperty = async (req, res) => {
    // Validate the property
    const property = await Property.findById(req.params.id);
    if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Property not found' })
    }
    // Check if post owner is the one deleting the property
    if (req.user.id === property.user.toString()) {
        // Update The Property
        const property = await Property.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true });
        const user = await User.findById(req.user.id).populate("properties");
        //  response to client 
        return res.status(StatusCodes.OK).json({ message: 'Listing has been deleted', success: true, user, property })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Access Denied' })
    }
}

module.exports = { createProperty, deleteProperty, getProperty, updateProperty, getAllProperties }