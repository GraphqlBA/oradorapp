exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('event_series', (table) => {
      table.string('logo').nullable();
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('event_series', (table) => {
      table.dropColumn('logo');
    })
  ])
);
