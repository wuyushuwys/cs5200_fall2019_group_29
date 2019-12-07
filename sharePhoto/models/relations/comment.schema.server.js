const mongoose = require('mongoose')
const user = require('../humanUser/person.schema.server')
const photo = require('../applicationContents/photo.schema.server')


module.exports = mongoose.Schema({
    user: {type: user, ref:"PersonModel"},
    photo: {type: photo, ref:"PhotoModel"},
    content: String
})