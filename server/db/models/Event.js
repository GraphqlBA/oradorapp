const bookshelf = require('../connection.js');

const Event = bookshelf.Model.extend({
  tableName: 'events'
});

module.exports = Event;
