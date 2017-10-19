const {createSelector} = require('reselect');
const {defaultToEmptyString} = require('../../util');

const graphSchemaSelector = (state) => state.getIn(['ui', 'graphSchema']);

const editorContentSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => defaultToEmptyString(graphSchema.get('editorContent'))
);

const shouldUpdateClassLinkLengthsSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('shouldUpdateClassLinkLengths')
);

const dimensionsSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('dimensions')
);

const panSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('pan')
);

const zoomSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('zoom')
);

const coordinatesSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('coordinates')
);

const dragSelector = createSelector(
  graphSchemaSelector,
  (graphSchema) => graphSchema.get('drag')
);

module.exports = {
  editorContentSelector,
  shouldUpdateClassLinkLengthsSelector,
  dimensionsSelector,
  coordinatesSelector,
  panSelector,
  zoomSelector,
  dragSelector,
};
