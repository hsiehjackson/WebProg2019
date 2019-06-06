const Subscription = {
  comment: {
    subscribe: async(parent, { postId }, { db, pubsub, models }, info) => {
      const Posts = await models.Post.find({});
      const post = Posts.find(post => post.id === postId && post.published)
      if (!post) {
        throw new Error('Post not found')
      }
      return pubsub.asyncIterator(`comment ${postId}`)
    }
  },
  post: {
    subscribe: async(parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator('post')
    }
  },
  user: {
    subscribe: async(parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator('user')
    }
  },
  login: {
    subscribe: async(parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator('login')
    }
  }
}

export { Subscription as default }
