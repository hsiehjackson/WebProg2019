const Comment = {
  author: async(parent, args, { db, models }, info) => {
    const Users = await models.User.find({});
    return Users.find(user => {
      return user.id === parent.author
    })
  },
  post: async(parent, args, { db, models }, info) =>{
    const Posts = await models.Post.find({});
    return Posts.find(post => {
      return post.id === parent.post
    })
  }
}

export { Comment as default }
