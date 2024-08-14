const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql;
const Participation = require('../models/Participation');

const ParticipationType = new GraphQLObjectType({
  name: 'Participation',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    participation: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    participations: {
      type: new GraphQLList(ParticipationType),
      resolve: async () => {
        try {
          return await Participation.find({});
        } catch (err) {
          console.error('Erro ao buscar participações:', err);
          throw new Error('Erro ao buscar participações: ' + err.message);
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addParticipation: {
      type: ParticipationType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        participation: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (_, args) => {
        const participation = new Participation({
          firstName: args.firstName,
          lastName: args.lastName,
          participation: args.participation
        });
        try {
          return await participation.save();
        } catch (err) {
          console.error('Erro ao adicionar participação:', err);
          throw new Error('Erro ao adicionar participação: ' + err.message);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
