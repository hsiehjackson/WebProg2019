import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    id: {
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    post: {
        type:String,
        required:true
    }
})

const Comments = mongoose.model('comments',CommentsSchema);
module.exports = Comments;