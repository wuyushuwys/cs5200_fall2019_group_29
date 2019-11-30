const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    _id: {
        type: String,
        // enum: ['animal', 'nature', 'travel', 'people', "food & drink", "texture & pattern"]
    }
}, {collection: 'photoTypes'})