let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let commentSchema = require('../models/relations/comment');

// CREATE Comment
router.route('/create').post((req, res, next) => {
    commentSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Comment
router.route('/').get((req, res, next) => {
    commentSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By Id
router.route('/:id').get((req, res, next) => {
    commentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By PhotoId
router.route('/photo/:photoId').get((req, res, next) => {
    commentSchema.find({photoId: req.params.photoId}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Find By UserId
router.route('/user/:userId').get((req, res, next) => {
    commentSchema.find({ userId: mongoose.Schema.Types.ObjectId(req.params.userId)}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update comment
router.route('/update/:id').put((req, res, next) => {
    commentSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Comment updated successfully !')
        }
    })
})

// Delete comment
router.route('/delete/:id').delete((req, res, next) => {
    commentSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
