exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('events', (table) => {
      table.increments('id').primary().unsigned();
      table.dateTime('start');
      table.dateTime('end');
      table.string('location');
      table.integer('event_series_id').unsigned();
      table.timestamps(true, true);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('events')
  ])
);
