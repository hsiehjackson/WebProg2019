import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    id: {
        type:String,
        required:true
    },
    like: {
        type:Number,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    published: {
        type:Boolean,
        required: true
    },
    author:{
        type:String,
        required: true
    },
})

const Posts = mongoose.model('posts',PostsSchema);
module.exports = Posts;