const mongoose = require('mongoose')
const user = require('../humanUser/person.schema.server')

module.exports = mongoose.Schema({
    createdBy: {type: user, ref:'PersonModel'} // created by user, all photo can have different owner
})