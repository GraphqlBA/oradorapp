exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('event_series', (table) => {
      table.increments('id').primary().unsigned();
      table.string('title');
      table.timestamps(true, true);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('event_series')
  ])
);
