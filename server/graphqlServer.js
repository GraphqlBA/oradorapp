const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schema');

const app = express();
module.exports = app;

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  debug: true
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
