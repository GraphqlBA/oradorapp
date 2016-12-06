const { connectionFromArray, toGlobalId, fromGlobalId } = require('graphql-relay');
const db = require('../db');

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
    id: speaker => toGlobalId('Speaker', speaker.id),
    talks: (speaker, args) => {
      const talks = db.getTalks();
      const speakers = talks.filter(talk => (
        talk.speakers.includes(Number(speaker.id))
      ));

      return connectionFromArray(speakers, args);
    }
  },
  Talk: {
    id: talk => toGlobalId('Talk', talk.id),
    speakers: talk => talk.speakers.map(db.getSpeakerById),
    event: talk => db.getEventById(talk.event)
  },
  Event: {
    eventSeries: event => db.getEventSeriesById(event.eventSeries)
  },
  User: {
    speakers(root, args) {
      return connectionFromArray(db.getSpeakers(), args);
    },
    talks(root, args) {
      return connectionFromArray(db.getTalks(), args);
    }
  },
  Query: {
    viewer() {
      return {};
    },
    node(root, args) {
      const { type, id } = fromGlobalId(args.id);
      switch (type) {
        case 'Speaker':
          return db.getSpeakers().find(s => s.id === +id);
        case 'Talk':
          return db.getTalks().find(t => t.id === +id);
        default:
          return null;
      }
    }
  }
};

module.exports = resolvers;
