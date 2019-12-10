const personDao = require('../daos/personDao');
// const express = require('express');
// const router = express.Router();

module.exports = function (app) {
    const router = app.Router();
    router.get('/').post((req, res, next) =>{
        personDao.createPerson(data => res.json(data))
    });

    return router;
    // router.get('/api/users').get((req, res) => {
    //     personDao.findAllUsers().then(users => res.json(users))
    // })
    // router..get('/api/users', function (req, res) {
    //     personDao.findAllUsers()
    //         .then(users => res.json(users))
    // })

    // app.get('/api/users/:firstName', function (req, res) {
    //     const firstName = req.params['firstName']
    //     console.log(firstName)
    //     personDao.findUserByFirstName(firstName)
    //         .then(user => res.json(user))
    // })


}