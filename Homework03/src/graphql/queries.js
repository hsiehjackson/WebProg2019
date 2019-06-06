import { gql } from 'apollo-boost'

export const LOGIN_QUERY = gql`
  query {
    isLogin {
      id
      name
      email
      age
    }
  }
`


export const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      body
      author {
        name
      }
      published
      comments {
        id,
        text,
        author {
          name
        }
      }
      like
    }
  }
`

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      age
      posts {
        id
        title
        body
        like
        author {
          id
          name
        }
        published
        comments{
          id
          text
          author{
            id
            name
          }
        }
      }
    }
  }
`

export const ALLUSERS_QUERY = gql`
  query {
    allusers {
      id
      name
      email
      age
      posts {
        id
        title
        body
        like
        author {
          id
          name
        }
        published
        comments{
          id
          text
          author{
            id
            name
          }
        }
      }
    }
  }
`