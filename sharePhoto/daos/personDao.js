const mongoose = require('mongoose')
const personModel = require('../models/humanUser/person.model.server')


const findAllUsers = () =>
    personModel.find()

const findUserByFirstName = firstName =>
    personModel.findOne({firstName: firstName})

const createPerson = user => personModel.create(user)

module.exports = {
    findAllUsers,
    findUserByFirstName,
    createPerson,
}