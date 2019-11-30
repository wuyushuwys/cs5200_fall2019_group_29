const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    _id: {
        type: String,
        // enum: ['create', 'edit', 'delete']
    }
}, {collection: 'privileges'})