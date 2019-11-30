const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    cameraMake: String,
    cameraModel: String
}, {collection: 'cameraInformation'})