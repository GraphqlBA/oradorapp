const { connectionFromArray } = require('graphql-relay');

const speakers = [
  {
    firstName: 'Pablo',
    lastName: 'Chiappetti',
    nickName: 'Chapa',
    bio: 'Dev. Llego patológicamente tarde a todos lados. De Rivadavia para abajo.',
    githubHandle: 'p4bloch',
    twitterHandle: 'p4bloch',
    homePageUrl: 'https://p4bloch.me'
  }
];

const resolvers = {
  Query: {
    speakers(root, args) {
      return connectionFromArray(speakers, args);
    }
  }
};

module.exports = resolvers;
