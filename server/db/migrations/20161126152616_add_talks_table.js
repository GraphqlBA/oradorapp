exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('talks', (table) => {
      table.increments('id').primary().unsigned();
      table.string('title');
      table.string('description');
      table.integer('event_id').unsigned();
      table.dateTime('deleted_at');
      table.timestamps(true, true);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('talks')
  ])
);
