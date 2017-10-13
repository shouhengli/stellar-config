const {createSelector} = require('reselect');

const ingestionProfileSelector = (state) => state.get('ingestionProfile');

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
    throw new Error('Not implemented.');
  }
);

module.exports = {
  ingestionProfileSelector,
  nameSelector,
  sourcesSelector,
  statusSelector,
  graphSchemaSelector,
  classNamesSelector,
  persistentIngestionProfileSelector,
};
