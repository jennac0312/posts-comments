const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    post : {
        type : String,
        maxLength: 200,
        required : true
    },
})

// this schema is a model for this data type

const Post = mongoose.model( 'Post' /* collection name in DB */ , PostSchema )

module.exports = Post