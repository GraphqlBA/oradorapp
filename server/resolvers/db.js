const { connectionFromArray, toGlobalId, fromGlobalId } = require('graphql-relay');
const db = require('../connectors/sqlite');

const resolvers = {
  Node: {
    __resolveType: data => data.type
  },
  Speaker: {
    id: speaker => toGlobalId('Speaker', speaker.id),
    talks: (speaker, args) => connectionFromArray(speaker.talks, args)
  },
  Talk: {
    id: talk => toGlobalId('Talk', talk.id)
  },
  Event: {
    id: event => toGlobalId('Event', event.id)
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
      return db.getSpeakers(args);
    },
    talks(root, args) {
      return db.getTalks(args);
    },
    events(root, args) {
      return db.getEvents(args);
    },
    topics(root, args) {
      return db.getTopics(args);
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
          return db.getSpeakerById(+id).then(speaker => (
            Object.assign({ type: 'Speaker' }, speaker)
          ));
        case 'Talk':
          return db.getTalkById(+id).then(talk => (
            Object.assign({ type: 'Talk' }, talk)
          ));
        case 'Event':
          return db.getEventById(+id).then(event => (
            Object.assign({ type: 'Event' }, event)
          ));
        case 'EventSeries':
          return db.getEventSerieById(+id).then(eventSerie => (
            Object.assign({ type: 'EventSerie' }, eventSerie)
          ));
        case 'Topic':
          return db.getTopicById(+id).then(topic => (
            Object.assign({ type: 'Topic' }, topic)
          ));
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
    talkAdd(root, args) {
      const { input } = args;
      return db.talkAdd({
        title: input.title,
        description: input.description,
        topicIds: input.topicIds.map(topicId => (
          +fromGlobalId(topicId).id
        )),
        eventId: +fromGlobalId(input.eventId).id,
        speakerIds: input.speakerIds.map(speakerId => (
          +fromGlobalId(speakerId).id
        ))
      }).then(newTalk => ({
        clientMutationId: input.clientMutationId,
        addedTalkId: newTalk.id,
        eventId: input.eventId,
        speakerIds: input.speakerIds
      }));
    },
    talkFavorite(root, args) {
      const { input } = args;
      return db.getTalkById(+fromGlobalId(input.talkId).id)
        .then(talk => (
            db.updateTalkById(talk.id, { favorited: true })
              .then(updatedTalk => ({
                clientMutationId: input.clientMutationId,
                talk: updatedTalk
              }))
          )
        );
    }
  }
};

module.exports = resolvers;
