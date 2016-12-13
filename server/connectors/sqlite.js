const Speaker = require('../db/models/Speaker');
const Talk = require('../db/models/Talk');
const Event = require('../db/models/Event');
const EventSerie = require('../db/models/EventSerie');
const Topic = require('../db/models/Topic');

const { getPaginatedModel } = require('./util/pagination');
const { connectionFromCollection, modelToJSON } = require('./util/relay');

const getSpeakers = (args) => {
  const query = qb => (args.query ? (
    qb
      .where('first_name', 'LIKE', `%${args.query}%`)
      .orWhere('last_name', 'LIKE', `%${args.query}%`)
  ) : false);

  return getPaginatedModel(Speaker, args, query).then(
    collection => connectionFromCollection(collection, args, 'Speaker')
  );
};

const getTalks = (args) => {
  const query = qb => (args.query ? (
    qb
      .where('title', 'LIKE', `%${args.query}%`)
      .orWhere('description', 'LIKE', `%${args.query}%`)
  ) : false);
  const extraParams = { withRelated: ['event.eventSeries'] };

  return getPaginatedModel(Talk, args, query, extraParams).then(
    collection => connectionFromCollection(collection, args, 'Talk')
  );
};

const getTopics = args => (
  getPaginatedModel(Topic, args).then(
    collection => connectionFromCollection(collection, args, 'Topic')
  )
);

const getEvents = args => getPaginatedModel(Event, args).then(
  collection => connectionFromCollection(collection, args, 'Event')
);

const getEventSeries = args => getPaginatedModel(EventSerie, args).then(
  collection => connectionFromCollection(collection, args, 'EventSerie')
);

const getTalkById = id => Talk.query({ where: { id } }).fetch({
  withRelated: ['speakers', 'event.eventSeries', 'topics']
}).then(modelToJSON).then(talk => (
  Object.assign(
    talk,
    { topics: talk.topics.map(topic => topic.name) }
  )
));

const updateTalkById = (id, payload) => (
  Talk.forge({ id }).save(payload).then(() => getTalkById(id))
);

const getSpeakerById = id => (
  Speaker.query({ where: { id } })
    .fetch({ withRelated: ['talks.event.eventSeries'] })
    .then(modelToJSON)
);

const getEventById = id => Event.query({ where: { id } }).fetch().then(modelToJSON);

const getEventSeriesById = id => EventSerie.query({ where: { id } }).fetch().then(modelToJSON);

const getTopicById = id => Topic.query({ where: { id } }).fetch().then(modelToJSON);

const talkAdd = ({ title, description, eventId, speakerIds, topicIds }) => (
  Talk.forge({ title, description, event_id: eventId }).save()
  .then(
    talk => talk.related('speakers').attach(speakerIds)
    .then(() => talk.related('topics').attach(topicIds))
  )
  .then(modelToJSON)
);

module.exports = {
  getSpeakers,
  getTalks,
  getTopics,
  getEvents,
  getEventSeries,
  getTalkById,
  updateTalkById,
  getSpeakerById,
  getEventById,
  getEventSeriesById,
  getTopicById,
  talkAdd
};
