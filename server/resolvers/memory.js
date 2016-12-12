const { connectionFromArray, toGlobalId, fromGlobalId } = require('graphql-relay');
const db = require('../connectors/memory');

const resolvers = {
  Node: {
    __resolveType: data => data.type
  },
  Speaker: {
    id: speaker => toGlobalId('Speaker', speaker.id),
    talks: (speaker, args) => {
      const talks = db.getTalks().filter(talk => (
        talk.speakers.includes(Number(speaker.id))
      ));

      return connectionFromArray(talks, args);
    }
  },
  Talk: {
    id: talk => toGlobalId('Talk', talk.id),
    speakers: talk => talk.speakers.map(db.getSpeakerById),
    event: talk => db.getEventById(talk.event)
  },
  Event: {
    id: event => toGlobalId('Event', event.id),
    eventSeries: event => db.getEventSeriesById(event.eventSeries)
  },
  EventSeries: {
    id: series => toGlobalId('EventSeries', series.id)
  },
  User: {
    id: () => toGlobalId('User', 1),
    speakers(root, args) {
      return connectionFromArray(db.getSpeakers(args.query), args);
    },
    talks(root, args) {
      return connectionFromArray(db.getTalks(args.query), args);
    },
    events(root, args) {
      return connectionFromArray(db.getEvents(), args);
    }
  },
  Query: {
    viewer: () => ({}),
    node(root, args) {
      const { type, id } = fromGlobalId(args.id);
      // Append type field so that Node's resolveType
      // can use it to know the type of the entity.
      switch (type) {
        case 'User':
          return { type: 'User' };
        case 'Speaker':
          return Object.assign({ type: 'Speaker' }, db.getSpeakerById(+id));
        case 'Talk':
          return Object.assign({ type: 'Talk' }, db.getTalkById(+id));
        case 'Event':
          return Object.assign({ type: 'Event' }, db.getEventById(+id));
        case 'EventSeries':
          return Object.assign({ type: 'EventSeries' }, db.getEventSeriesById(+id));
        default:
          return null;
      }
    }
  },

  TalkAddPayload: {
    viewer: () => ({}),
    event: root => db.getEventById(+fromGlobalId(root.eventId).id),
    speakers: root => root.speakerIds.map(speakerId => (
      db.getSpeakerById(+fromGlobalId(speakerId).id)
    ))
  },
  Mutation: {
    talkAdd(root, args) {
      const { input } = args;
      const newTalk = db.addTalk({
        title: input.title,
        description: input.description,
        topics: input.topics,
        eventId: +fromGlobalId(input.eventId).id,
        speakerIds: input.speakerIds.map(speakerId => (
          +fromGlobalId(speakerId).id
        ))
      });

      return {
        clientMutationId: input.clientMutationId,
        newTalkId: newTalk.id,
        eventId: input.eventId,
        speakerIds: input.speakerIds
      };
    }
  }
};

module.exports = resolvers;
