const {createSelector} = require('reselect');

const nameSelector = (state) => state.getIn(['ingestionProfile', 'name']);

const sourcesSelector = (state) => state.getIn(['ingestionProfile', 'sources']);

const statusSelector = (state) => state.getIn(['ingestionProfile', 'status']);

const graphSchemaSelector = (state) =>
  state.getIn(['ingestionProfile', 'graphSchema']);

const classNamesSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.keySeq()
);

const persistentIngestionProfileSelector = createSelector(
  sourcesSelector,
  graphSchemaSelector,
  (sources, graphSchema) => {
    return {
      sources: sources.toJS(),
      graphSchema: graphSchema.toJS(),
    };
  }
);

module.exports = {
  nameSelector,
  sourcesSelector,
  statusSelector,
  graphSchemaSelector,
  classNamesSelector,
  persistentIngestionProfileSelector,
};
