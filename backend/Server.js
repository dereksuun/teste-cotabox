const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./Schema/Schema'); // Certifique-se de que o caminho está correto
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();

// Conecte ao MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err.message);
});
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// Middleware CORS
app.use(cors());

// Configurar Apollo Server
const server = new ApolloServer({
  schema,
  formatError: (err) => {
    console.error('Erro no GraphQL:', err.message);
    return { message: err.message };
  }
});

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000; // Usa a porta definida na variável de ambiente ou 4000 como padrão
  app.listen(PORT, () => {
    console.log(`Now listening for requests on port ${PORT}`);
  });
});
