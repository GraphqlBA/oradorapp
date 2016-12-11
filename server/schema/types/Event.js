const { CONNECTION_ARGS } = require('../constants');

module.exports = `
type EventEdge {
  cursor: String!
  node: Event
}

type EventConnection {
  edges: [EventEdge]
  pageInfo: PageInfo!
}

# The instance of a meetup or conf. It contains the dates and location it happens.
type Event implements Node {
  id: ID!
  title: String!
  start: String! #TODO: Change to DateTime
  end: String #TODO: Change to DateTime
  location: String
  talks(${CONNECTION_ARGS}): TalkConnection!
  eventSeries: EventSeries!
}
`;
