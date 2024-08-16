const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const schema = require('./Schema/Schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err.message);
});
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// Middleware CORS
app.use(cors());

// Middleware Helmet para configurar CSP
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://cdn.jsdelivr.net", "https://apollo-server-landing-page.cdn.apollographql.com"],
      "img-src": ["'self'", "data:", "https://apollo-server-landing-page.cdn.apollographql.com"],
      "default-src": ["'self'"],
      "connect-src": ["'self'", "ws://localhost:4000"],
    },
  },
}));


// Configurar Apollo Server
const server = new ApolloServer({
  schema,
  formatError: (err) => {
    console.error('Erro no GraphQL:', err.message);
    return { message: err.message };
  },
  subscriptions: {
    path: '/graphql',
  },
});

// Criar servidor HTTP
const httpServer = http.createServer(app);

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Configurar WebSocket Server para subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  // Iniciar o servidor HTTP
  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});
