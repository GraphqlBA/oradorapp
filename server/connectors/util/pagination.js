const { fromGlobalId } = require('graphql-relay');

module.exports = {
  getPaginatedModel: (model, { after, first }, query = () => {}, { withRelated } = {}) => {
    const afterId = after ? fromGlobalId(after).id : undefined;

    return model.query(query).fetchPage({
      limit: first,
      offset: afterId,
      withRelated
    });
  },
  shouldHaveNextPage: ({ offset, rowCount, limit }) => ((rowCount - offset) >= limit),
  shouldHavePreviousPage: ({ offset, limit }) => (offset > limit)
};
