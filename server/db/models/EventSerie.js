const bookshelf = require('../connection.js');

const EventSerie = bookshelf.Model.extend({
  tableName: 'event_series'
});

module.exports = EventSerie;
