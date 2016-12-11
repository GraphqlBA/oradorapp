/* eslint-disable import/no-extraneous-dependencies, camelcase */
const casual = require('casual');
const { resetSequence } = require('./util');

function talkFactory() {
  return {
    title: casual.sentence,
    description: casual.sentences(4),
    event_id: casual.integer(1, 100)
  };
}

exports.seed = (knex, Promise) => (
  Promise.all([
    resetSequence(knex, 'talks'),
    resetSequence(knex, 'speakers_talks'),
    knex('talks').del(),
    knex('speakers_talks').del()
  ]).then(() => {
    const promises = [];
    [...Array(100)].forEach((_, talk_id) => {
      promises.push(knex('talks').insert(talkFactory()));
      [...Array(casual.integer(1, 3))].forEach(() => {
        const speaker_id = casual.integer(1, 100);
        promises.push(knex('speakers_talks').insert({ speaker_id, talk_id }));
      });
    });

    return Promise.all(promises);
  })
);
