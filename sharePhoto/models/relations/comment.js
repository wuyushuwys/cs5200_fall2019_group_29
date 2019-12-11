const mongoose = require('mongoose')



commentSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    photoId:mongoose.Schema.Types.ObjectId,
    content: String
})

module.exports = mongoose.model('CommentModel', commentSchema)