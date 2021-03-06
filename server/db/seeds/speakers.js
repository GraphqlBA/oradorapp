/* eslint-disable import/no-extraneous-dependencies */
const casual = require('casual');
const { resetSequence, howMany } = require('./util');

function speakerFactory() {
  const username = casual.username.toLowerCase();
  return {
    first_name: casual.first_name,
    last_name: casual.last_name,
    nickname: username,
    github_handle: username,
    twitter_handle: username,
    website: casual.url,
    picture: `http://placehold.it/300x300?text=${username}`,
    bio: casual.sentences(3)
  };
}

exports.seed = (knex, Promise) => (
  Promise.all([
    resetSequence(knex, 'speakers'),
    knex('speakers').del()
  ]).then(() => {
    const promises = [];
    [...Array(howMany)].forEach(() => {
      promises.push(knex('speakers').insert(speakerFactory()));
    });

    return Promise.all(promises);
  })
);
