let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let userSchema = require('../models/humanUser/person');

// CREATE User
router.route('/create').post((req, res, next) => {
    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ User
router.route('/').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find User ID
router.route('/:id').get((req, res) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find User By Password and Username
router.route('/:username/:password').get((req, res) => {
    userSchema.find({
        username: req.params.username,
        password: req.params.password
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find Admin By Password and Username and Admin key
router.route('/:username/:password/:adminKey').get((req, res) => {
    userSchema.find({
        username: req.params.username,
        password: req.params.password,
        adminKey: req.params.adminKey
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update user
router.route('/update/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

// Delete User
router.route('/delete/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
