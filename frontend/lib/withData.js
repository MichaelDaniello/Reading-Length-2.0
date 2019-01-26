// Next-Apollo package to make sure server-side rendering works
import withApollo from 'next-with-apollo'
// You can import Apollo along with any 'link's you want, or do this
import ApolloClient from 'apollo-boost'
import { devEndpoint, stagingEndpoint, prodEndpoint } from '../config'

function createClient({ headers }) {
  return new ApolloClient({
    // Can change this if you have different Yoga APIs for dev, prod
    uri:
      process.env.NODE_ENV === 'production'
        ? prodEndpoint
        : process.env.NODE_ENV === 'staging'
        ? stagingEndpoint
        : devEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          // Bring cookies along for the ride
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

// Use to create client in _app.js
export default withApollo(createClient)
