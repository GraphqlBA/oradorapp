const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const CONNECTION_ARGS = 'after: String, first: Int, before: String, last: Int';

const schema = `
scalar DateTime

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type SpeakerEdge {
  cursor: String!
  node: Speaker
}

type SpeakerConnection {
  edges: [SpeakerEdge]
  pageInfo: PageInfo!
}

type TalkEdge {
  cursor: String!
  node: Talk
}

type TalkConnection {
  edges: [TalkEdge]
  pageInfo: PageInfo!
}

type EventEdge {
  cursor: String!
  node: Event
}

type EventConnection {
  edges: [EventEdge]
  pageInfo: PageInfo!
}

type EventSeriesEdge {
  cursor: String!
  node: EventSeries
}

type EventSeriesConnection {
  edges: [EventSeriesEdge]
  pageInfo: PageInfo!
}

# A person that attends events and gives talks
type Speaker implements Node {
  id: ID!
  firstName: String!
  lastName: String!
  nickName: String
  bio: String!
  githubHandle: String
  twitterHandle: String
  website: String
  talks(${CONNECTION_ARGS}): TalkConnection!
}

# The talk a speaker gave at an event.
type Talk implements Node {
  id: ID!
  title: String!
  description: String!
  topics: [String!]
  speakers: [Speaker!]
  event: Event!
}

# The instance of a meetup or conf. It contains the dates and location it happens.
type Event implements Node {
  id: ID!
  title: String!
  start: DateTime!
  end: DateTime
  location: String
  talks(${CONNECTION_ARGS}): TalkConnection!
  eventSeries: EventSeries!
}

# The entity that groups a set of events. This is basically the conf or meetup itself.
type EventSeries implements Node {
  id: ID!
  title: String!
  events(${CONNECTION_ARGS}): EventConnection!
}

type User {
  speakers(query: String, ${CONNECTION_ARGS}): SpeakerConnection!
  talks(query: String, ${CONNECTION_ARGS}): TalkConnection!
}

type Query {
  viewer: User!
  node(id: ID!): Node
}

schema {
  query: Query
}
`;

module.exports = makeExecutableSchema({ typeDefs: schema, resolvers });
