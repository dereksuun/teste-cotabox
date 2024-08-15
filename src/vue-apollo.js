import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Link HTTP para queries e mutations
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Link WebSocket para subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

// Divide entre HTTP e WebSocket
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link,
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;
