const Speaker = require('../db/models/Speaker');
const Talk = require('../db/models/Talk');
const Event = require('../db/models/Event');
const EventSerie = require('../db/models/EventSerie');

module.exports = {
  getSpeakers: (limit = 10) => Speaker.fetchAll(),
  getTalks: (limit = 10) => Talk.fetchAll(),
  getTalkById: (id) => Talk.get(id),
  getSpeakerById: (id) => Speaker.get(id),
  getEventById: (id) => Event.get(id),
  getEventSeriesById: (id) => EventSerie.get(id)
};
