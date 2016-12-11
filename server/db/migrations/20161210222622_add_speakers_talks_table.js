exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('speakers_talks', (table) => {
      table.increments('id').primary().unsigned();
      table.integer('speaker_id').unsigned();
      table.integer('talk_id').unsigned();
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('speakers_talks')
  ])
);
