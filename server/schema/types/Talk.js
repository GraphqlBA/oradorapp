module.exports = `
type TalkEdge {
  cursor: String!
  node: Talk
}

type TalkConnection {
  edges: [TalkEdge]
  pageInfo: PageInfo!
}

# The talk a speaker gave at an event.
type Talk implements Node {
  id: ID!
  title: String!
  description: String!
  topics: [String!] #TODO: Implement Topic type
  speakers: [Speaker!]
  event: Event!
}

input TalkAddInput {
  clientMutationId: String
  title: String!
  description: String!
  topics: [String!]
  speakerIds: [String!]
  eventId: String!
}

type TalkAddPayload {
  clientMutationId: String
  viewer: User!
  speakers: [Speaker!]
  event: Event!
}
`;
