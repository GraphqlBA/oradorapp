const { CONNECTION_ARGS } = require('../constants');

module.exports = `
type User implements Node {
  id: ID!
  speakers(query: String, ${CONNECTION_ARGS}): SpeakerConnection!
  talks(query: String, ${CONNECTION_ARGS}): TalkConnection!
  events(query: String, ${CONNECTION_ARGS}): EventConnection!
  topics(query: String, ${CONNECTION_ARGS}): TopicConnection!
}
`;
