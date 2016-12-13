exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('talks', (table) => {
      table.boolean('favorited').defaultTo(false);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('talks', (table) => {
      table.dropColumn('favorited');
    })
  ])
);
