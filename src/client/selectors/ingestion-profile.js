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
  require('./ui/graph-schema').editorContentSelector,
  (sources, graphSchema, editorContent) => {
    return {
      sources: sources.toJS(),
      graphSchema: graphSchema.toJS(),
      // This is just a temporary workaround for using an editor to build graph schema.
      // Changes will be introduced to replace the editor with form controls. This field will then
      // beremoved.
      editorContent,
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
