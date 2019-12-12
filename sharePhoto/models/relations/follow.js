const mongoose = require('mongoose')


followSchema = mongoose.Schema({
    // follower: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'person'
    // },
    // followed:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'person'
    // }
    follower: String,
    followed: String
},{collection: 'follows'})

module.exports = mongoose.model('FollowModel', followSchema)