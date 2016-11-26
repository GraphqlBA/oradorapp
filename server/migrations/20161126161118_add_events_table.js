exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function(table) {
      table.increments('id').primary().unsigned();
      table.dateTime('start');
      table.dateTime('end');
      table.string('location');
      table.integer('event_series_id').unsigned();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events')
  ]);
};
