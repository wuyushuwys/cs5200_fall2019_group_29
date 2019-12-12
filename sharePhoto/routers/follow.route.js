let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let followSchema = require('../models/relations/follow');

// CREATE follows
router.route('/create').post((req, res, next) => {
    followSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ follows
router.route('/').get((req, res, next) => {
    followSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By Id
router.route('/:id').get((req, res, next) => {
    followSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By follower ID
// router.route('/follower/:Id').get((req, res, next) => {
//     followSchema.find({follower: req.params.Id}, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })


// Find By followed ID
// router.route('/followed/:followedId').get((req, res, next) => {
//     followSchema.find({followed: req.params.followedId}, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

// Update comment
// router.route('/update/:id').put((req, res, next) => {
//     followSchema.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//             console.log(error)
//         } else {
//             res.json(data)
//             console.log('Comment updated successfully !')
//         }
//     })
// })

// Delete follow
router.route('/delete/:id').delete((req, res, next) => {
    followSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
