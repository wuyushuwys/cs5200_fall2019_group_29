const mongoose = require('mongoose')

commentSchema = mongoose.Schema({
    userId: String,
    photoId:String,
    content: String
})

module.exports = mongoose.model('CommentModel', commentSchema)