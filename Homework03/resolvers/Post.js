const Post = {
  author: async(parent, args, { db, models }, info) => {
    const Users = await models.User.find({});
    return Users.find(user => {
      return user.id === parent.author
    })
  },
  comments: async(parent, args, { db, models }, info) => {
    const Comments = await models.Comment.find({});
    return Comments.filter(comment => {
      return comment.post === parent.id
    })
  }
}

export { Post as default }
