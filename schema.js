const schema = `
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
type Speaker {
  firstName: String!
  lastName: String!
  nickName: String
  bio: String!
  githubUrl: String
  twitterUrl: String
  homePageUrl: String
}

# The talk a speaker gave at an event.
type Talk {
  title: String!
  description: String!
  topics: [String!]
  speakers: [Speaker!]
  event: Event!
}

# The instance of a meetup or conf. It contains the dates and location it happens.
type Event {
  title: String!
  dates: [String!] # A list of dates in ISO-8601 format
  location: String
  talks: TalkConnection
  eventSeries: EventSeries!
}

# The entity that groups a set of events. This is basically the conf or meetup itself.
type EventSeries {
  title: String!
  events: EventConnection
}

type Query {

}

type Mutation {

}

schema {
  query: Query,
  mutation: Mutation
}
`;

export default schema;
