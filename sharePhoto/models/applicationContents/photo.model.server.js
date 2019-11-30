const mongoose = require('mongoose')
const photoSchema = require('./photo.schema.server')

module.exports = mongoose.model('PhotoModel', photoSchema)