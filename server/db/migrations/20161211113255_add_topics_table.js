exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('topics', (table) => {
      table.increments('id').primary().unsigned();
      table.string('name');
      table.timestamps(true, true);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('topics')
  ])
);
