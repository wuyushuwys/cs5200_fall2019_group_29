const mongoose = require('mongoose')
const cameraInfoSchema = require('./cameraInformation.schema.server')

module.exports = mongoose.model("CameraInfoModel", cameraInfoSchema)