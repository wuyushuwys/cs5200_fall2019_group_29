const personDao = require('../daos/personDao')




module.exports = function(app){

    const users = [
        {_id: '1', firstName:"Yushu"},
        {_id: '2', firstName:"Zhiling"}
    ]

    app.get('/api/users', function (req, res){
        personDao.findAllUsers()
            .then(users => res.json(users))
    })

    app.get('/api/users/:firstName', function (req, res) {
        const firstName = req.params['firstName']
        console.log(firstName)
        personDao.findUserByFirstName(firstName)
            .then(user => res.json(user))
    })
}