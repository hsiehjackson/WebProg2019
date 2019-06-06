const User = {
  posts: async(parent, args, { db, models }, info) => {
    const Posts = await models.Post.find({});
    return Posts.filter(post => {
      return post.author === parent.id
    })
  },
  comments: async(parent, args, { db, models }, info) =>{
    const Comments = await models.Comment.find({});
    return Comments.filter(comment => {
      return comment.author === parent.id
    })
  }
}

export { User as default }
