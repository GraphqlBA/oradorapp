/* eslint-disable no-param-reassign */
const bookshelf = require('../connection.js');
const camelCase = require('lodash.camelcase');
require('./Event');
require('./Speaker');
require('./Topic');

const Talk = bookshelf.model('Talk', {
  tableName: 'talks',
  event() { return this.belongsTo('Event', 'event_id'); },
  topics() { return this.belongsToMany('Topic'); },
  speakers() { return this.belongsToMany('Speaker'); },
  parse: attrs => (
    Object.keys(attrs).reduce((obj, key) => {
      if (key.match('_id')) {
        obj[key] = attrs[key];
        return obj;
      }
      obj[camelCase(key)] = attrs[key];
      return obj;
    }, {})
  )
});

module.exports = Talk;
