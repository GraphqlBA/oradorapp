/* eslint-disable no-param-reassign */
const bookshelf = require('../connection.js');
const camelCase = require('lodash.camelcase');
require('./Talk');

const Speaker = bookshelf.model('Speaker', {
  tableName: 'speakers',
  talks() {
    return this.belongsToMany('Talk');
  },
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

module.exports = Speaker;
