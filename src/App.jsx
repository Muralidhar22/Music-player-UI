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
    <div style={{ "--gradient": gradient }} className="font-basier app p-3 lg:p-7 text-white min-h-screen">
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </div>
  )
}

export default App
