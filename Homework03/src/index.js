import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
//import { ApolloLink } from 'apollo-boost'
//import { onError } from 'apollo-link-error'
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import App from './containers/App/App'
import * as serviceWorker from './serviceWorker'


// Create an http link:
const httpLink = new HttpLink({
  uri: '/',
  credentials: 'include'
})

const WS = window.location.origin.replace('http', 'ws')
// Create a WebSocket link:

const wsLink = new WebSocketLink({
  uri: WS,
  options: { reconnect: true },
  credentials: 'include'
})



/*
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})y

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, wsLink, httpLink]),
  cache: new InMemoryCache().restore({}),
})
*/

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent


const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({}),
})




const wrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(wrappedApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
