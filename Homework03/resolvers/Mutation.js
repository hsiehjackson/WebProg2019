import uuidv4 from 'uuid/v4'
import bcrypt from 'bcryptjs'

const Mutation = {
  createUser: async (parent, args, { db, pubsub, models}, info) => {
    const Users = await models.User.find({});
    const emailTaken = Users.some(user => user.email === args.data.email)

    if (emailTaken) {
      throw new Error('Email taken')
    }

    const pwd = await bcrypt.hashSync(args.data.pwd, 10)
    const user = {
      id: uuidv4(),
      ...args.data
    }
    user["pwd"] = pwd

    const newUser = new models.User(user)
    try {
      await newUser.save();
    } catch (e) {
      throw new Error('Cannot Save User!!!');
    }
    //db.users.push(user)

    pubsub.publish('user', {
      user: {
        mutation: 'CREATED',
        data: user
      }
    })
    return user
  },
  loginUser: async (parent, args, { db, pubsub, models, req }, info) => {
    const Users = await models.User.find({});
    const emailTaken = Users.some(user => user.email === args.data.email)
    if (emailTaken){
      const userIndex = Users.findIndex(user => user.email === args.data.email)
      if (await bcrypt.compareSync(args.data.pwd, Users[userIndex].pwd)) {

        req.session.user = Users[userIndex];
        pubsub.publish('login', {
          login: {
            mutation: 'CREATED',
            data: Users[userIndex]
          }
        });
        return Users[userIndex];
      }
      throw new Error('Incorrect password.');
    }
    throw new Error('No Such User exists.');
  },
  signoutUser: async (parent, args, { db, pubsub, models, req }, info) => {
    if (typeof req.session.user !== 'undefined'){
      req.session.user = null
      return true
    }
    return false
  },
  deleteUser(parent, args, { db, pubsub }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUsers = db.users.splice(userIndex, 1)

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id)
      }

      return !match
    })
    db.comments = db.comments.filter(comment => comment.author !== args.id)

    pubsub.publish('user', {
      user: {
        mutation: 'DELETED',
        data: user
      }
    })

    return deletedUsers[0]
  },
  updateUser(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const user = db.users.find(user => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  createPost: async (parent, args, { db, pubsub, models, req}, info) => {

    const Users = await models.User.find({});
    const userExists = Users.some(user => user.id === args.data.author)

    if (!userExists) {
      throw new Error('User not found')
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }
    /*
    if (typeof req.session.user !== 'undefined')
      if (req.session.user.id !== 0)
        post.author = req.session.user.id
    */
    const newPost = new models.Post(post)
    try {
      await newPost.save();
    } catch (e) {
      throw new Error('Cannot Save Post!!!');
    }
    //db.posts.unshift(post)

    if (args.data.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }

    return post
  },
  deletePost: async(parent, args, { db, pubsub, models }, info) => {
    const Posts = await models.Post.find({});
    const postIndex = Posts.findIndex(post => post.id === args.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }
    await models.Post.findByIdAndRemove({ _id: Posts[postIndex]._id })
    await models.Comment.remove({post: args.id})
    const [post] = Posts.splice(postIndex, 1)

    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post
        }
      })
    }

    return post
  },
  updatePost: async(parent, args, { db, pubsub, models}, info) => {
    const { id, data } = args
    const Posts = await models.Post.find({});
    const post = Posts.find(post => post.id === id)
    const originalPost = { ...post }

    if (!post) {
      throw new Error('Post not found')
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }
    if (typeof data.like === 'number') {
      post.like = data.like
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        })
      } else if (!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      }
    } else if (post.published) {
      await models.Post.findByIdAndUpdate(post._id, post)
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }

    return post
  },
  createComment: async(parent, args, { db, pubsub, models }, info) => {
    const Users = await models.User.find({});
    const Posts = await models.Post.find({});
    const userExists = Users.some(user => user.id === args.data.author)
    const postExists = Posts.some(
      //post => post.id === args.data.post && post.published
      post => post.id === args.data.post
    )
    if (!userExists || !postExists) {
      throw new Error('Unable to find user and post')
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    const newComment = new models.Comment(comment)
    try {
      await newComment.save();
    } catch (e) {
      throw new Error('Cannot Save Comment!!!');
    }

    //db.comments.push(comment)
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    })

    return comment
  },
  deleteComment: async(parent, args, { db, pubsub, models }, info) => {
    const Comments = await models.Comment.find({})
    const commentIndex = Comments.findIndex(comment => comment.id === args.id)

    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }

    await models.Comment.findByIdAndRemove({ _id: Comments[commentIndex]._id })
    const [deletedComment] = Comments.splice(commentIndex, 1)

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    })

    return deletedComment
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const comment = db.comments.find(comment => comment.id === id)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    })

    return comment
  }
}

export { Mutation as default }
