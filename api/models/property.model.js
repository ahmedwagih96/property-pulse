const mongoose = require("mongoose")
const { PropertySchema } = require('../schemas/property.schema')

const Property = mongoose.model('Property', PropertySchema);

module.exports = {Property}
