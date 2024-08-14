import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;
