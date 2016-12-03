const { connectionFromArray, toGlobalId, fromGlobalId } = require('graphql-relay');

const speakers = [
  {
    id: 1,
    firstName: 'Pablo',
    lastName: 'Chiappetti',
    nickName: 'Chapa',
    bio: 'Dev. Llego patológicamente tarde a todos lados. De Rivadavia para abajo.',
    githubHandle: 'p4bloch',
    twitterHandle: 'p4bloch',
    website: 'https://p4bloch.me'
  }
];

const talks = [
  {
    id: 1,
    title: 'Un titulo',
    description: 'Una descripcion'
  }
];

const resolvers = {
  Node: {
    __resolveType(data, context, info) {
      if (data.firstName) {
        return info.schema.getType('Speaker');
      }
      if (data.title) {
        return info.schema.getType('Talk');
      }
      return null;
    }
  },
  Speaker: {
    id: speaker => toGlobalId('Speaker', speaker.id)
  },
  Talk: {
    id: talk => toGlobalId('Talk', talk.id)
  },
  Query: {
    speakers(root, args) {
      return connectionFromArray(speakers, args);
    },
    talks(root, args) {
      return connectionFromArray(talks, args);
    },
    node(root, args) {
      const { type, id } = fromGlobalId(args.id);
      switch (type) {
        case 'Speaker':
          return speakers.find(s => s.id === +id);
        case 'Talk':
          return talks.find(t => t.id === +id);
        default:
          return null;
      }
    }
  }
};

module.exports = resolvers;
