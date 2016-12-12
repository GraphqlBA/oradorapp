const express = require('express');
const graphqlServer = require('./graphqlServer');

const PORT = 3000;
const app = express();

app.use(graphqlServer);

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  const devServer = require('./devServer');
  app.use(devServer);
} else {
  app.use(express.static('build'));
}

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`
    App corriendo en http://localhost:${PORT}
    GraphiQL en http://localhost:${PORT}/graphiql
  `);
});
