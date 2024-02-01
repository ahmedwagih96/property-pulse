const { StatusCodes } = require('http-status-codes');
const { Property } = require('../models/property.model')
const { User } = require('../models/user.model.js');
const { UnauthorizedError, NotFoundError } = require('../errors')

const getAllProperties = async (req, res) => {
    const { parking, furnished, type, sort, searchName, pageNumber } = req.query;

    // Initiate Queries Object 
    const queries = {}
    if (parking) queries.parking = true
    if (furnished) queries.furnished = true
    if (type) queries.type = type
    if (searchName) queries.name = { $regex: searchName, $options: 'i' }

    let results = Property.find(queries);

    // Set PageNumber, PageLimit and Skip
    const page = Number(pageNumber) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Sorting the properties according to create data
    sort ? results.sort(sort)
        : results.sort('-createdAt')

    results = results.skip(skip).limit(limit)
    const properties = await results.populate("user");
    const count = await Property.find(queries).count()
    return res.status(StatusCodes.OK).json({ success: true, properties, count })
}

const getProperty = async (req, res) => {
    const property = await Property.findById(req.params.id).select(['-_id', '-createdAt', '-updatedAt', '-__v']).populate("user")
    if (!property) {
        throw new NotFoundError('Property Not Found');

    }
    return res.status(StatusCodes.OK).json({ success: true, property })
}
const createProperty = async (req, res) => {
    const property = await Property.create({ ...req.body, user: req.user.userId });
    const user = await User.findById(req.user.userId).populate("properties");
    return res.status(StatusCodes.CREATED).json({ user, success: true, property })
}

const deleteProperty = async (req, res) => {
    // Validate the property
    const property = await Property.findById(req.params.id);
    if (!property) {
        throw new NotFoundError('Property Not Found');
    }
    // Check if post owner is the one deleting the property
    if (req.user.userId !== property.user.toString()) {
        throw new UnauthorizedError('Access Denied')
    }
    // Delete The Property
    await Property.findByIdAndDelete(req.params.id);
    // Get the updated Listings back 
    const user = await User.findById(req.user.userId).populate("properties");
    // response to client 
    return res.status(StatusCodes.OK).json({ message: 'Listing has been deleted', success: true, user })
}

const updateProperty = async (req, res) => {
    // Validate the property
    let property = await Property.findById(req.params.id);
    if (!property) {
        throw new NotFoundError('Property Not Found');
    }
    // Check if post owner is the one deleting the property
    if (req.user.userId !== property.user.toString()) {
        throw new UnauthorizedError('Access Denied');
    }
    // Update The Property
    property = await Property.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true });
    const user = await User.findById(req.user.userId).populate("properties");
    //  response to client 
    return res.status(StatusCodes.OK).json({ message: 'Listing has been Updated', success: true, user, property })
}

module.exports = { createProperty, deleteProperty, getProperty, updateProperty, getAllProperties }