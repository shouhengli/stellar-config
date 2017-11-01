const {createSelector} = require('reselect');
const {Map} = require('immutable');
const {newNodeSelector} = require('./ui/ingestion-profile');
const {MAPPING_NODE_TYPE_KEY} = require('../ingestion-profile');

const nameSelector = (state) => state.getIn(['ingestionProfile', 'name']);

const sourcesSelector = (state) => state.getIn(['ingestionProfile', 'sources']);

const statusSelector = (state) => state.getIn(['ingestionProfile', 'status']);

const graphSchemaSelector = (state) =>
  state.getIn(['ingestionProfile', 'graphSchema']);

const classNamesSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('classes').keySeq()
);

const persistentIngestionProfileSelector = createSelector(
  sourcesSelector,
  graphSchemaSelector,
  require('./ui/graph-schema').editorContentSelector,
  (sources, graphSchema, editorContent) => {
    return {
      sources: sources.toJS(),
      graphSchema: {
        classes: graphSchema.get('classes').valueSeq().toJS(),
        classLinks: graphSchema.get('classLinks').valueSeq().toJS(),
      },
      // This is just a temporary workaround for using an editor to build graph schema.
      // Changes will be introduced to replace the editor with form controls. This field will then
      // beremoved.
      editorContent,
    };
  }
);

const mappingNodesSelector = (state) =>
  state.getIn(['ingestionProfile', 'mapping', 'nodes']);

const newMappingNodePropOptionsSelector = createSelector(
  graphSchemaSelector,
  newNodeSelector,
  (graphSchema, newNode) =>
    graphSchema
      .getIn(
        [
          'classes',
          newNode.get(MAPPING_NODE_TYPE_KEY, ''),
          'props',
        ],
        Map()
      )
      .keySeq()
      .toSet()
      .subtract(newNode.keySeq())
);

module.exports = {
  nameSelector,
  sourcesSelector,
  statusSelector,
  classNamesSelector,
  persistentIngestionProfileSelector,
  mappingNodesSelector,
  newMappingNodePropOptionsSelector,
};
