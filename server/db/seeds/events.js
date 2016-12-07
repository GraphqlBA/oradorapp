/* eslint-disable import/no-extraneous-dependencies */
const casual = require('casual');

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
  return {
    title: `${casual.name} ${casual.random_element(['Conf', 'Meetup'])}`
  };
}

exports.seed = (knex, Promise) => {
  knex('events').del().then(() => {
    const promises = [];
    [...Array(100)].forEach(() => {
      promises.push(knex('events').insert(eventFactory()));
    });

    return Promise.all(promises);
  });
  knex('event_series').del().then(() => {
    const promises = [];
    [...Array(100)].forEach(() => {
      promises.push(knex('event_series').insert(eventSeriesFactory()));
    });

    return Promise.all(promises);
  });
};
