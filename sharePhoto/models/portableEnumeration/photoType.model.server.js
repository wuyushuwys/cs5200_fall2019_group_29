const mongoose = require('mongoose')
const photoTypeSchema = require('./photoType.schema.server')

module.exports = mongoose.model('PhotoTypeModel', photoTypeSchema)