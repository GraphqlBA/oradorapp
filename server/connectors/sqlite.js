const Speaker = require('../db/models/Speaker');
const Talk = require('../db/models/Talk');
const Event = require('../db/models/Event');
const EventSerie = require('../db/models/EventSerie');

const { getPaginatedModel } = require('./util/pagination');
const { connectionFromCollection, modelToJSON } = require('./util/relay');

module.exports = {
  getSpeakers: (args) => {
    const query = qb => (args.query ? (
      qb
        .where('first_name', 'LIKE', `%${args.query}%`)
        .orWhere('last_name', 'LIKE', `%${args.query}%`)
    ) : false);

    return getPaginatedModel(Speaker, args, query).then(
      collection => connectionFromCollection(collection, args, 'Speaker')
    );
  },

  getTalks: (args) => {
    const query = qb => (args.query ? (
      qb
        .where('title', 'LIKE', `%${args.query}%`)
        .orWhere('description', 'LIKE', `%${args.query}%`)
    ) : false);
    const extraParams = { withRelated: ['event.eventSeries'] };

    return getPaginatedModel(Talk, args, query, extraParams).then(
      collection => connectionFromCollection(collection, args, 'Talk')
    );
  },

  getEvents: args => getPaginatedModel(Event, args).then(
    collection => connectionFromCollection(collection, args, 'Event')
  ),

  getEventSeries: args => getPaginatedModel(EventSerie, args).then(
    collection => connectionFromCollection(collection, args, 'EventSerie')
  ),

  getTalkById: id => Talk.query({ where: { id } }).fetch({
    withRelated: ['speakers', 'event.eventSeries', 'topics']
  }).then(modelToJSON).then(talk => (
    Object.assign(
      talk,
      { topics: talk.topics.map(topic => topic.name) }
    )
  )),

  getSpeakerById: id => (
    Speaker.query({ where: { id } })
      .fetch({ withRelated: ['talks.event.eventSeries'] })
      .then(modelToJSON)
  ),

  getEventById: id => Event.query({ where: { id } }).fetch().then(modelToJSON),
  getEventSeriesById: id => EventSerie.query({ where: { id } }).fetch().then(modelToJSON),
  addTalk: () => {}
};
