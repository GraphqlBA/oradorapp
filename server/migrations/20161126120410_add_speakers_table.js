exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('speakers', (table) => {
      table.increments('id').primary().unsigned();
      table.string('first_name');
      table.string('last_name');
      table.string('nickname');
      table.string('github_handle');
      table.string('twitter_handle');
      table.string('website');
      table.text('bio');
      table.dateTime('deleted_at');
      table.timestamps(true, true);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('speakers')
  ])
);
