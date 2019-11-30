const mongoose = require('mongoose')
const user = require('../humanUser/person.schema.server')
const photo = require('../applicationContents/photo.schema.server')

module.exports = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'PersonModel'},
    photo: {type: mongoose.Schema.ObjectId, ref: 'PhotoModel'},
    comment: String
}, {collection: 'comments'})