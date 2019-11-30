const mongoose = require('mongoose')
const privilegeSchema = require('./privilege.schema.server')

module.exports = mongoose.model('Privilege', privilegeSchema)
