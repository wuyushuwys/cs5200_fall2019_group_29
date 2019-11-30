const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    _id: {
        type: String,
        // enum: ['editor', 'reviewer', 'uploader', 'liker', 'commenter']
    }
}, {collection: 'photoRoles'})