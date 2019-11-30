const mongoose = require('mongoose')
const gallery = require('./gallery.schema.server')
const album = require('./album.schema.server')

module.exports = mongoose.Schema({
    title: String,
    description: String,
    collectionType:{
        type: String,
        enum: ['gallery' ,'album']
    },
    gallery: gallery,
    album: album
}, {collection: 'collections'})
