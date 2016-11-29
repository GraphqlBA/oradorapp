/* eslint-disable import/no-extraneous-dependencies */
const casual = require('casual');

function talkFactory() {
  return {
    title: casual.sentence,
    description: casual.sentences(4),
    event_id: casual.integer(1, 100)
  };
}

exports.seed = (knex, Promise) => (
  knex('talks').del().then(() => {
    const promises = [];
    [...Array(100)].forEach(() => {
      promises.push(knex('talks').insert(talkFactory()));
    });

    return Promise.all(promises);
  })
);
