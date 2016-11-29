const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const PORT = 3000;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: makeExecutableSchema({ typeDefs: schema, resolvers }),
  debug: true
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(PORT, () => {
  console.log(`Server started. Listening on port ${PORT}.`);
});
