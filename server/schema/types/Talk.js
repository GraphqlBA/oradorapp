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
  favorited: Boolean
  topics: [Topic!]
  speakers: [Speaker!]
  event: Event!
}

input TalkFavoriteInput {
  clientMutationId: String
  talkId: String!
}

type TalkFavoritePayload {
  clientMutationId: String
  talk: Talk!
}

input TalkAddInput {
  clientMutationId: String
  title: String!
  description: String!
  topicIds: [String!]
  speakerIds: [String!]
  eventId: String!
}

type TalkAddPayload {
  clientMutationId: String
  viewer: User!
  speakers: [Speaker!]
  event: Event!
  addedTalk: Talk
}
`;
