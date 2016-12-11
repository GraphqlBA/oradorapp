const { CONNECTION_ARGS } = require('../constants');

module.exports = `
type EventSeriesEdge {
  cursor: String!
  node: EventSeries
}

type EventSeriesConnection {
  edges: [EventSeriesEdge]
  pageInfo: PageInfo!
}

# The entity that groups a set of events. This is basically the conf or meetup itself.
type EventSeries implements Node {
  id: ID!
  title: String!
  logo: String
  events(${CONNECTION_ARGS}): EventConnection!
}
`;
