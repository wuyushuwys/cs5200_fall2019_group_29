const mongoose = require('mongoose')
const owner = require('../humanUser/person.schema.server')

module.exports = mongoose.Schema({
    owner: {type: owner, ref:'PersonModel'} // created by owner, only one owner
})