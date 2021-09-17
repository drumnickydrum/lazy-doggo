import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { UseLazyQuery, UseQuery, UseQueryRefetchVariable } from './Examples';

const client = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <main>
        <UseQuery />
        <UseQueryRefetchVariable />
        <UseLazyQuery />
      </main>
    </ApolloProvider>
  );
}

export default App;
