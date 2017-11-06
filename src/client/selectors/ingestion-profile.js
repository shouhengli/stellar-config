const {createSelector} = require('reselect');
const {List, Map} = require('immutable');
const {MAPPING_NODE_TYPE_KEY} = require('../ingestion-profile');

const {
  newNodeSelector,
  newLinkSelector,
} = require('./ui/ingestion-profile');

const ingestionProfileSelector = (state) => state.get('ingestionProfile');

const nameSelector = createSelector(
  ingestionProfileSelector,
  (ingestionProfile) => ingestionProfile.get('name')
);

const sourcesSelector = createSelector(
  ingestionProfileSelector,
  (ingestionProfile) => ingestionProfile.get('sources')
);

const statusSelector = createSelector(
  ingestionProfileSelector,
  (ingestionProfile) => ingestionProfile.get('status')
);

const graphSchemaSelector = createSelector(
  ingestionProfileSelector,
  (ingestionProfile) => ingestionProfile.get('graphSchema')
);

const classNamesSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('classes', List()).keySeq()
);

const classLinkKeysSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('classLinks', List()).keySeq()
);

const mappingSelector = createSelector(
  ingestionProfileSelector,
  (ingestionProfile) => ingestionProfile.get('mapping')
);

const persistentIngestionProfileSelector = createSelector(
  sourcesSelector,
  graphSchemaSelector,
  mappingSelector,
  require('./ui/graph-schema').editorContentSelector,
  (sources, graphSchema, mapping, editorContent) => {
    return {
      sources: sources.toJS(),
      graphSchema: {
        classes: graphSchema.get('classes', List()).valueSeq().toJS(),
        classLinks: graphSchema.get('classLinks', List()).valueSeq().toJS(),
      },
      mapping: mapping.toJS(),
      // This is just a temporary workaround for using an editor to build graph schema.
      // Changes will be introduced to replace the editor with form controls. This field will then
      // beremoved.
      editorContent,
    };
  }
);

const mappingNodesSelector = createSelector(
  mappingSelector,
  (mapping) => mapping.get('nodes', List())
);

const mappingLinksSelector = createSelector(
  mappingSelector,
  (mapping) => mapping.get('links', List())
);

const newMappingNodePropOptionsSelector = createSelector(
  graphSchemaSelector,
  newNodeSelector,
  (graphSchema, newNode) =>
    graphSchema
      .getIn(
        [
          'classes',
          newNode.get(MAPPING_NODE_TYPE_KEY),
          'props',
        ],
        Map()
      )
      .keySeq()
      .toSet()
      .subtract(newNode.keySeq())
);

const newMappingLinkPropOptionsSelector = createSelector(
  graphSchemaSelector,
  newLinkSelector,
  (graphSchema, newLink) =>
    graphSchema
      .getIn(
        [
          'classLinks',
          newLink.get(MAPPING_NODE_TYPE_KEY),
          'props',
        ],
        Map()
      )
      .keySeq()
      .toSet()
      .subtract(newLink.keySeq())
);

module.exports = {
  nameSelector,
  sourcesSelector,
  statusSelector,
  classNamesSelector,
  classLinkKeysSelector,
  persistentIngestionProfileSelector,
  mappingNodesSelector,
  mappingLinksSelector,
  newMappingNodePropOptionsSelector,
  newMappingLinkPropOptionsSelector,
};
