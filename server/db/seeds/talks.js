/* eslint-disable import/no-extraneous-dependencies, camelcase */
const casual = require('casual');
const { resetSequence, howMany } = require('./util');
const { topics } = require('./topics');

function talkFactory() {
  return {
    title: casual.sentence,
    description: casual.sentences(4),
    event_id: casual.integer(1, howMany)
  };
}

exports.seed = (knex, Promise) => (
  Promise.all([
    resetSequence(knex, 'talks'),
    resetSequence(knex, 'speakers_talks'),
    knex('talks').del(),
    knex('speakers_talks').del(),
    knex('talks_topics').del()
  ]).then(() => {
    const promises = [];
    [...Array(howMany)].forEach((_, talk_id) => {
      promises.push(knex('talks').insert(talkFactory()));
      [...Array(casual.integer(1, 3))].forEach(() => {
        const speaker_id = casual.integer(1, howMany);
        promises.push(knex('speakers_talks').insert({ speaker_id, talk_id }));
      });
      [...Array(casual.integer(1, 3))].forEach(() => {
        const topic_id = casual.integer(1, topics.length);
        promises.push(knex('talks_topics').insert({ topic_id, talk_id }));
      });
    });

    return Promise.all(promises);
  })
);
