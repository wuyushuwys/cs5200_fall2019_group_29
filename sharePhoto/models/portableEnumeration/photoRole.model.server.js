const mongoose = require('mongoose')
const photoRoleSchema = require('./photoRole.schema.server')

module.exports = mongoose.model('PhotoRoleModel', photoRoleSchema)