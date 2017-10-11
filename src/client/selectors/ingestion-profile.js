const {createSelector} = require('reselect');

const getGraphSchema = (state) => state.getIn(['ingestionProfile', 'graphSchema']);

const getClassNames = createSelector(
  getGraphSchema,
  (graphSchema) => graphSchema.keySeq()
);

module.exports = {
  getGraphSchema,
  getClassNames,
};
