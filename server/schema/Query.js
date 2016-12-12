module.exports = `
type Query {
  viewer: User!
  node(id: ID!): Node
}
`;
