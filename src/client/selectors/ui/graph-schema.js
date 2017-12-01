const { createSelector } = require('reselect');
const { defaultToEmptyString } = require('../../util');

const graphSchemaSelector = state => state.getIn(['ui', 'graphSchema']);

export const editorContentSelector = createSelector(
  graphSchemaSelector,
  graphSchema => defaultToEmptyString(graphSchema.get('editorContent'))
);

export const shouldUpdateClassLinkLengthsSelector = createSelector(
  graphSchemaSelector,
  graphSchema => graphSchema.get('shouldUpdateClassLinkLengths')
);

export const dimensionsSelector = createSelector(
  graphSchemaSelector,
  graphSchema => graphSchema.get('dimensions')
);

export const panSelector = createSelector(graphSchemaSelector, graphSchema =>
  graphSchema.get('pan')
);

export const zoomSelector = createSelector(graphSchemaSelector, graphSchema =>
  graphSchema.get('zoom')
);

export const coordinatesSelector = createSelector(
  graphSchemaSelector,
  graphSchema => graphSchema.get('coordinates')
);

export const dragSelector = createSelector(graphSchemaSelector, graphSchema =>
  graphSchema.get('drag')
);
