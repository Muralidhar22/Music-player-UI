import { useState } from 'react'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error"

import Home from './pages/Home';
import { useGradientContext } from './context/gradientContext';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if(graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.ss.dev/resource/api" })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  const { gradient } = useGradientContext()
  return (
    <div className={`bg-gradient-to-tl from-black to-[${gradient}] p-2 text-white min-w-screen`}>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </div>
  )
}

export default App
