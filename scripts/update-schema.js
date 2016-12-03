const fs = require('fs');
const path = require('path');
const Schema = require('../server/schema');
const { graphql } = require('graphql');
const { introspectionQuery } = require('graphql/utilities');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, introspectionQuery).then((result) => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
}, (err) => {
  console.error(err);
});
