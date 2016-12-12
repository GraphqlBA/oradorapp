const { CONNECTION_ARGS } = require('../constants');

module.exports = `
type SpeakerEdge {
  cursor: String!
  node: Speaker
}

type SpeakerConnection {
  edges: [SpeakerEdge]
  pageInfo: PageInfo!
}

# A person that attends events and gives talks
type Speaker implements Node {
  id: ID!
  firstName: String!
  lastName: String!
  nickname: String
  bio: String!
  picture: String
  githubHandle: String
  twitterHandle: String
  website: String
  talks(${CONNECTION_ARGS}): TalkConnection!
}
`;
