const mongoose = require('mongoose')
// const admin = require('./admin.schema.server')
// const user = require('./user.schema.server')
// const Schema = mongoose.Schema;

// Single table strategy
let personSchema  = mongoose.Schema({
    // _id: Number,
    firstName: String,
    lastName: String,
    password: String,
    username: String,
    gender: {
        type: String,
        enum:['Male', 'Female', 'Others']
    },
    birthday: Date,
    personType: {
        type: String,
        enum: ['User', 'Administrator']
    },
    adminKey: String,
    // bio: String,
    userRole:{
        type: String,
        enum: ['Editor','Reviewer','Uploader']
    },
    privilege:{
        type: String,
        enum: ['Create','Edit','Update','Delete']
    }
}, {collection: 'persons'})

module.exports = mongoose.model('Person', personSchema)