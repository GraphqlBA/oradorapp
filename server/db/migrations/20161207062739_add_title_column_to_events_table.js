exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('events', (table) => {
      table.string('title').nullable();
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('events', (table) => {
      table.dropColumn('title');
    })
  ])
);
