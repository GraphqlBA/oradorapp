const bookshelf = require('../connection.js');
const Speaker = require('./Speaker');

const Talk = bookshelf.Model.extend({
  tableName: 'talks',
  speaker: () => this.belongsTo(Speaker)
});

module.exports = Talk;
