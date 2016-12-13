module.exports = `
type TopicEdge {
  cursor: String!
  node: Topic
}

type TopicConnection {
  edges: [TopicEdge]
  pageInfo: PageInfo!
}

# A topic a talk can be related to
type Topic implements Node {
  id: ID!
  name: String!
}
`;
