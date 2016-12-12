/* eslint-disable import/no-extraneous-dependencies */
const { resetSequence } = require('./util');

const topics = ['Javascript', 'GraphQL', 'NodeJS', 'PHP', 'Ruby', 'API', 'CSS', 'React', 'Angular'];

exports.seed = (knex, Promise) => (
  Promise.all([
    resetSequence(knex, 'topics'),
    knex('topics').del()
  ]).then(() => {
    const promises = [];
    topics.forEach((name) => {
      promises.push(knex('topics').insert({ name }));
    });

    return Promise.all(promises);
  })
);
exports.topics = topics;
