import mongoose from 'mongoose';
import User from './user.js';
import Comment from './comment';
import Post from './post';

mongoose.Promise = global.Promise;

export const startDB = ({ URL }) => 
  mongoose.connect(URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB...", err));
  
export const models = {
  User,
  Comment,
  Post
}