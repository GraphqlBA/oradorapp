exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('speakers', (table) => {
      table.string('picture').nullable();
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('speakers', (table) => {
      table.dropColumn('picture');
    })
  ])
);
