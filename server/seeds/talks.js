const casual = require('casual');

function talkFactory() {
  return {
    title: casual.sentence,
    description: casual.sentences(4),
    event_id: casual.integer(1, 100),
  }
}

exports.seed = function(knex, Promise) {
  return knex('talks').del().then(function () {
    var promises = [];
    [...Array(100)].forEach(function() {
      promises.push(knex('talks').insert(talkFactory()));
    })

    return Promise.all(promises);
  });
};
