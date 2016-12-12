const resetSequence = (knex, table) => knex('sqlite_sequence').where('name', table).del();

module.exports = {
  resetSequence
};
