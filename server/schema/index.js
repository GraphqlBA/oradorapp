const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers/db');
const Event = require('./types/Event');
const EventSeries = require('./types/EventSeries');
const Speaker = require('./types/Speaker');
const Talk = require('./types/Talk');
const Topic = require('./types/Topic');
const User = require('./types/User');
const Query = require('./Query');
const Mutation = require('./Mutation');

const schema = `
interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

schema {
  query: Query,
  mutation: Mutation
}
`;

module.exports = makeExecutableSchema({
  typeDefs: [
    schema, Event, EventSeries, Speaker, Talk, Topic, User, Query, Mutation
  ],
  resolvers
});
