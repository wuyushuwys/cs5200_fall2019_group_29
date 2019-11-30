const mongoose = require('mongoose')
const collectionSchema = require('./collection.schema.server')

module.exports = mongoose.model('CollectionModel', collectionSchema)