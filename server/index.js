const express = require('express');
const graphqlServer = require('./graphqlServer');

const PORT = 3000;
const app = express();

app.use(graphqlServer);

if (process.env.NODE_ENV !== 'production') {
  const devServer = require('./devServer');
  app.use(devServer);
} else {
  app.use(express.static('build'));
}

app.listen(PORT, () => {
  console.log(`
    Server corriendo en http://localhost:${PORT}
    GraphiQL en http://localhost:${PORT}/graphiql
  `);
});
