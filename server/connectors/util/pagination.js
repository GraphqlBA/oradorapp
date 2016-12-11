const { fromGlobalId } = require('graphql-relay');

module.exports = {
  getPaginatedModel: (model, { after, first }, { withRelated } = {}) => {
    const afterId = after ? fromGlobalId(after).id : undefined;

    return model.fetchPage({
      limit: first,
      offset: afterId,
      withRelated
    });
  },
  shouldHaveNextPage: ({ offset, rowCount, pageCount }) => ((rowCount - offset) > pageCount),
  shouldHavePreviousPage: ({ offset, limit }) => (offset > limit)
};
