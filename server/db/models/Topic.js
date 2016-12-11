/* eslint-disable no-param-reassign */
const bookshelf = require('../connection.js');
const Talk = require('./Talk');

const Topic = bookshelf.model('Topic', {
  tableName: 'topics',
  talks() {
    return this.belongsToMany(Talk);
  }
});

module.exports = Topic;
