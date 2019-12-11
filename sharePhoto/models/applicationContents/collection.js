const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let collectionSchema  = mongoose.Schema({
    title: String,
    description: String,

}, {collection: 'collections'})

module.exports = mongoose.model('CollectionModel', collectionSchema)