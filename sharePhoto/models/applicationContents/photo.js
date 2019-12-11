const mongoose = require('mongoose')

let photoSchema  = mongoose.Schema({
    // _id: Number,
    title: String,
    description: String,
    src: String,
    ownerId: String,
    ownerName: String,
    created: Date,
    updated:Date

}, {collection: 'photos'})

module.exports = mongoose.model('PhotoModel', photoSchema)