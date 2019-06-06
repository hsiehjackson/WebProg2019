const Query = {
  isLogin: async (parent, args, { req }) => {
    if (typeof req.session.user !== 'undefined')
      return req.session.user
    return null
  }, 
  users: async(parent, args, { db, models, req }, info) => {
    const Users = await models.User.find({});   
    if (req.session.user.id == '0') {
      return Users
    }
    else{
      return [req.session.user]
    }
  },
  allusers: async(parent, args, { db, models, req }, info) => {
    const Users = await models.User.find({});   
    return Users
  },

  posts: async(parent, args, { db, models }, info) => {
    const Posts = await models.Post.find({});
    if (!args.query) {
      return Posts
    }

    return Posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase())
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase())
      return isTitleMatch || isBodyMatch
    })
  },
  comments: async(parent, args, { db, models }, info) => {
    const Comments = await models.Comment.find({});
    return Comments
  },
  me() {
    return {
      id: '123098',
      name: 'Mike',
      email: 'mike@example.com'
    }
  },
  post() {
    return {
      id: '092',
      title: 'GraphQL 101',
      body: '',
      published: false
    }
  }
}

export { Query as default }
