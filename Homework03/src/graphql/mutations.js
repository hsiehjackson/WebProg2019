import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $published: Boolean!
    $authorId: ID!
    $like: Int!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        published: $published
        author: $authorId
        like: $like
      }
    ) {
      title
      body
      author {
        name
      }
      published
      like
    }
  }
`
export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment(
    $text: String!
    $authorId: ID!
    $postId: ID!
  ) {
    createComment(
      data: {
        text: $text
        author: $authorId
        post: $postId
      }
    ) {
      text
      author {
        name
      }
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment(
    $commentId: ID!
  ) {
    deleteComment(id: $commentId) 
    {
      text
      author {
        name
      }
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost(
    $postId: ID!
  ) {
    deletePost(id: $postId) 
    {
      title
      author {
        name
      }
    }
  }
`

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $postId: ID!
    $title: String
    $body: String
    $published: Boolean
    $like: Int
  ) {
    updatePost(
      id: $postId,
      data:{
        title: $title
        body: $body
        published: $published
        like: $like
      }) 
    {
      title
      like
    }
  }
`

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser(
    $email: String!
    $pwd: String!
    ){
      loginUser(
        data: {
          email: $email
          pwd: $pwd
        })
      {
        id
        name
        email
        pwd
      }
    } 
`


export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $age: Int
    $pwd: String!
    ){
      createUser(
        data: {
          name: $name
          email: $email
          age: $age
          pwd: $pwd
        })
      {
        name
        email
        pwd 
        age
      }
    } 
`

export const SIGNOUT_USER_MUTATION = gql`
  mutation {
    signoutUser
  }
`