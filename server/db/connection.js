const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: `${__dirname}/dev.sqlite3`
  },
  useNullAsDefault: true
});
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('pagination');
bookshelf.plugin('registry');

module.exports = bookshelf;
