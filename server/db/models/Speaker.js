const bookshelf = require('../connection.js');

const Speaker = bookshelf.Model.extend({
  tableName: 'speakers'
});

module.exports = Speaker;
