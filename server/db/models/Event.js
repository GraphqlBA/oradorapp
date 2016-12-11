/* eslint-disable no-param-reassign */
const bookshelf = require('../connection.js');
const camelCase = require('lodash.camelcase');
const EventSerie = require('./EventSerie');

const Event = bookshelf.model('Event', {
  tableName: 'events',
  eventSeries() {
    return this.belongsTo(EventSerie, 'event_series_id');
  },
  parse: attrs => (
    Object.keys(attrs).reduce((obj, key) => {
      if (key.match('_id')) {
        obj[key] = attrs[key];
        return obj;
      }
      obj[camelCase(key)] = attrs[key];
      return obj;
    }, {})
  )
});

module.exports = Event;
