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
    event: talk => db.getEventById(talk.event),
    topics: talk => talk.topics.map(db.getTopicById)
  },
  Event: {
    id: event => toGlobalId('Event', event.id),
    eventSeries: event => db.getEventSeriesById(event.eventSeries)
  },
  EventSeries: {
    id: series => toGlobalId('EventSeries', series.id)
  },
  Topic: {
    id: topic => toGlobalId('Topic', topic.id)
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
    },
    topics(root, args) {
      return connectionFromArray(db.getTopics(), args);
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
        case 'Topic':
          return Object.assign({ type: 'Topic' }, db.getTopicById(+id));
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
    )),
    addedTalk: root => db.getTalkById(root.addedTalkId)
  },
  Mutation: {
    talkFavorite(root, args) {
      const { input } = args;
      const talk = db.getTalkById(+fromGlobalId(input.talkId).id);
      talk.favorited = true;

      return {
        clientMutationId: input.clientMutationId,
        talk
      };
    },
    talkAdd(root, args) {
      const { input } = args;
      const newTalk = db.addTalk({
        title: input.title,
        description: input.description,
        topicIds: input.topicIds.map(topicId => (
          +fromGlobalId(topicId).id
        )),
        eventId: +fromGlobalId(input.eventId).id,
        speakerIds: input.speakerIds.map(speakerId => (
          +fromGlobalId(speakerId).id
        ))
      });

      return {
        clientMutationId: input.clientMutationId,
        addedTalkId: newTalk.id,
        eventId: input.eventId,
        speakerIds: input.speakerIds
      };
    }
  }
};

module.exports = resolvers;
