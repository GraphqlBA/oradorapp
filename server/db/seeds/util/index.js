const resetSequence = (knex, table) => knex('sqlite_sequence').where('name', table).del();
const howMany = 50;

module.exports = {
  resetSequence,
  howMany
};
