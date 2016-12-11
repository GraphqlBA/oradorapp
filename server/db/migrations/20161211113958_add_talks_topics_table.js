exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('talks_topics', (table) => {
      table.increments('id').primary().unsigned();
      table.integer('talk_id').unsigned();
      table.integer('topic_id').unsigned();
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('talks_topics')
  ])
);
