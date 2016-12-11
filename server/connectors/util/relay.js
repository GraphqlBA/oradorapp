const { toGlobalId } = require('graphql-relay');
const { shouldHaveNextPage, shouldHavePreviousPage } = require('./pagination');

const modelToJSON = item => item.toJSON();
const collectionToJSON = collection => collection.map(modelToJSON);
const createNode = (node, type) => ({ cursor: toGlobalId(type, node.id), node });

const connectionFromCollection = (collection, args, type) => {
  const items = collectionToJSON(collection);
  return {
    edges: items.map(item => createNode(item, type)),
    pageInfo: {
      startCursor: args.after ? args.after : undefined,
      endCursor: items.legnth && toGlobalId(type, items[items.length - 1].id),
      hasPreviousPage: shouldHavePreviousPage(collection.pagination),
      hasNextPage: shouldHaveNextPage(collection.pagination)
    }
  };
};

module.exports = {
  connectionFromCollection,
  modelToJSON
};
