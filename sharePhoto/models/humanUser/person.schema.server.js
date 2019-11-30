const mongoose = require('mongoose')
const developer = require('./developer.schema.server')
const administrator = require('./administrator.schema.server')
const user = require('./user.schema.server')

// Single table strategy
module.exports = mongoose.Schema({
    // _id: Number,
    firstName: String,
    lastName: String,
    password: String,
    username: String,
    gender: {
        type: String,
        enum:['Male', 'Female', 'Other']
    },
    dateOfBirth: Date,
    personType: {
        type: String,
        enum: ['User', 'Developer', 'Administrator']
    },
    developer: developer,
    administrator: administrator,
    user: user
}, {collection: 'persons'})