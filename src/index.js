import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: operation => {
        operation.setContext(context => ({
            headers: {
                ...context.headers,
                authorization: localStorage.getItem('token')
            }
        }))
    }
})

const query = gql`
    {
        totalUsers
        totalPhotos
    }
`

console.log('cache', client.extract())

client.query({query})
    .then(() => console.log('cache', client.extract()))
    .catch(console.error)

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
