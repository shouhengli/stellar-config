import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import { MAPPING_NODE_TYPE_KEY } from '../ingestion-profile';
import {
  mappingNodeSelector,
  mappingLinkSelector
} from './ui/ingestion-profile';
import {
  createPersistentClass,
  createPersistentClassLink
} from '../ingestion-profile';

const ingestionProfileSelector = state => state.get('ingestionProfile');

export const nameSelector = createSelector(
  ingestionProfileSelector,
  ingestionProfile => ingestionProfile.get('name')
);

export const sourcesSelector = createSelector(
  ingestionProfileSelector,
  ingestionProfile => ingestionProfile.get('sources')
);

export const statusSelector = createSelector(
  ingestionProfileSelector,
  ingestionProfile => ingestionProfile.get('status')
);

export const graphSchemaSelector = createSelector(
  ingestionProfileSelector,
  ingestionProfile => ingestionProfile.get('graphSchema')
);

export const classesSelector = createSelector(
  graphSchemaSelector,
  graphSchema => graphSchema.get('classes', Map())
);

export const classNamesSelector = createSelector(
  graphSchemaSelector,
  graphSchema =>
    graphSchema
      .get('classes', Map())
      .valueSeq()
      .map(c => c.get('name'))
      .toList()
);

export const classLinksSelector = createSelector(
  graphSchemaSelector,
  graphSchema => graphSchema.get('classLinks', Map())
);

const mappingSelector = createSelector(
  ingestionProfileSelector,
  ingestionProfile => ingestionProfile.get('mapping')
);

export const persistentIngestionProfileSelector = createSelector(
  sourcesSelector,
  graphSchemaSelector,
  mappingSelector,
  (sources, graphSchema, mapping) => {
    return {
      sources: sources.toJS(),
      graphSchema: {
        classes: graphSchema
          .get('classes', Map())
          .valueSeq()
          .map(createPersistentClass)
          .toJS(),
        classLinks: graphSchema
          .get('classLinks', Map())
          .valueSeq()
          .map(createPersistentClassLink)
          .toJS()
      },
      mapping: mapping.toJS()
    };
  }
);

export const mappingNodesSelector = createSelector(mappingSelector, mapping =>
  mapping.get('nodes', List())
);

export const mappingLinksSelector = createSelector(mappingSelector, mapping =>
  mapping.get('links', List())
);

export const mappingNodePropOptionsSelector = createSelector(
  graphSchemaSelector,
  mappingNodeSelector,
  (graphSchema, mappingNode) =>
    graphSchema
      .getIn(
        ['classes', mappingNode.get(MAPPING_NODE_TYPE_KEY), 'props'],
        Map()
      )
      .keySeq()
      .toSet()
      .subtract(mappingNode.keySeq())
);

export const mappingLinkPropOptionsSelector = createSelector(
  graphSchemaSelector,
  mappingLinkSelector,
  (graphSchema, mappingLink) =>
    graphSchema
      .getIn(
        ['classLinks', mappingLink.get(MAPPING_NODE_TYPE_KEY), 'props'],
        Map()
      )
      .keySeq()
      .toSet()
      .subtract(mappingLink.keySeq())
);
