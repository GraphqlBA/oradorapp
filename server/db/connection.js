const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: `${__dirname}/dev.sqlite3`
  }
});

module.exports = require('bookshelf')(knex);
