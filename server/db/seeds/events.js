/* eslint-disable import/no-extraneous-dependencies */
const casual = require('casual');
const { resetSequence } = require('./util');

function eventFactory() {
  const date = casual.date();
  return {
    title: casual.sentence,
    start: `${date} ${casual.time()}`,
    end: `${date} ${casual.time()}`,
    location: casual.address,
    event_series_id: 1
  };
}

function eventSeriesFactory() {
  const confOrMeetup = casual.random_element(['Conf', 'Meetup']);
  return {
    title: `${casual.name} ${confOrMeetup}`,
    logo: `http://placehold.it/100x100?text=${confOrMeetup}`
  };
}

exports.seed = (knex, Promise) => (
  Promise.all([
    resetSequence(knex, 'events'),
    resetSequence(knex, 'event_series'),
    knex('events').del(),
    knex('event_series').del()
  ]).then(() => {
    const promises = [];
    [...Array(100)].forEach(() => {
      promises.push(knex('events').insert(eventFactory()));
    });
    [...Array(100)].forEach(() => {
      promises.push(knex('event_series').insert(eventSeriesFactory()));
    });

    return Promise.all(promises);
  })
);
