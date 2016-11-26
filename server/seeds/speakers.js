const casual = require('casual');

function speakerFactory() {
  const username = casual.username.toLowerCase();
  return {
    first_name: casual.first_name,
    last_name: casual.last_name,
    nickname: username,
    github_handle: username,
    twitter_handle: username,
    website: casual.url,
    bio: casual.sentences(3)
  }
}

exports.seed = function(knex, Promise) {
  return knex('speakers').del().then(function () {
    var promises = [];
    [...Array(100)].forEach(function() {
      promises.push(knex('speakers').insert(speakerFactory()));
    })

    return Promise.all(promises);
  });
};
