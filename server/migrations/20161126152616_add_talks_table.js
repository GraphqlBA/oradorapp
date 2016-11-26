exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('talks', function(table) {
      table.increments('id').primary().unsigned();
      table.string('title');
      table.string('description');
      table.integer('event_id').unsigned();
      table.dateTime('deleted_at');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('talks')
  ]);
};
