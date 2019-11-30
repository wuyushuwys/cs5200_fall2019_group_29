const mongoose = require('mongoose')
const cameraInformation = require('./cameraInformation.schema.server')
const photoType = require('../portableEnumeration/photoType.schema.server')
module.exports = mongoose.Schema({
    // _id: Number,
    title: String,
    description: String,
    photoType: {type: String, ref: 'PhotoTypeModel'},
    width: Number,
    height: String,
    tag: String,
    cameraInfo:{type: cameraInformation, ref: 'CameraInfoModel'}
}, {collection: 'photos'})