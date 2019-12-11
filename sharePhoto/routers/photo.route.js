let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let photoSchema = require('../models/applicationContents/photo')

// CREATE Photo
router.route('/create').post((req, res, next) => {
    photoSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Photo
router.route('/').get((req, res) => {
    photoSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By Owner Id
router.route('/user/:ownerId').get((req, res) => {
    photoSchema.find({ownerId: mongoose.Schema.Types.ObjectId(req.params.ownerId)}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By Id
router.route('/:id').get((req, res) => {
    photoSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update photo
router.route('/update/:id').put((req, res, next) => {
    photoSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Photo updated successfully !')
        }
    })
})

// Delete photo
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
