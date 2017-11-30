import { Map, List } from 'immutable';
import R from 'ramda';
import { createSelector } from 'reselect';
import {
  MAPPING_NODE_ID_KEY,
  MAPPING_NODE_TYPE_KEY,
  MAPPING_LINK_TYPE_KEY,
  MAPPING_LINK_SOURCE_KEY,
  MAPPING_LINK_DESTINATION_KEY
} from '../../ingestion-profile';

const ingestionProfileUiSelector = state =>
  state.getIn(['ui', 'ingestionProfile']);

export const newNameSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newName')
);

export const newVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newVisible')
);

export const deleteVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('deleteVisible')
);

export const deleteNameSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('deleteName')
);

export const activeTabSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('activeTab')
);

export const newSourceVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newSourceVisible')
);

export const newSourceSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newSource')
);

export const deleteSourceVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('deleteSourceVisible')
);

export const selectedSourceSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('selectedSource')
);

export const samplesSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('samples')
);

export const sampleOfSelectedSourceSelector = createSelector(
  samplesSelector,
  selectedSourceSelector,
  (samples, selectedSource) => samples.get(selectedSource)
);

export const newNodeVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newNodeVisible')
);

export const newLinkVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newLinkVisible')
);

export const mappingNodeSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingNode')
);

export const mappingNodeActivePropSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingNodeActiveProp')
);

export const mappingNodeColumnOptionsSelector = createSelector(
  samplesSelector,
  mappingNodeSelector,
  mappingNodeActivePropSelector,
  (samples, mappingNode, activeProp) =>
    samples.getIn(
      [mappingNode.getIn([activeProp.get('key'), 'source'], ''), 'headers'],
      List()
    )
);

export const mappingNodeSaveEnabledSelector = createSelector(
  mappingNodeSelector,
  mappingNode => {
    if (
      !mappingNode.has(MAPPING_NODE_ID_KEY) ||
      !mappingNode.has(MAPPING_NODE_TYPE_KEY)
    ) {
      return false;
    }

    if (mappingNode.has('')) {
      return false;
    }

    const valueEmpty = mappingNode.some(
      R.ifElse(
        R.is(Map),
        R.ifElse(
          value => value.has('source'),
          value => value.get('source') === '' || value.get('column') === '',
          R.isNil
        ),
        value => R.isNil(value) || R.isEmpty(value)
      )
    );

    if (valueEmpty) {
      return false;
    }

    return true;
  }
);

export const editingNodeIndexSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('editingNodeIndex')
);

export const mappingLinkSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingLink')
);

export const mappingLinkActivePropSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingLinkActiveProp')
);

export const mappingLinkColumnOptionsSelector = createSelector(
  samplesSelector,
  mappingLinkSelector,
  mappingLinkActivePropSelector,
  (samples, newNode, activeProp) =>
    samples.getIn(
      [newNode.getIn([activeProp.get('key'), 'source'], ''), 'headers'],
      List()
    )
);

export const mappingLinkSaveEnabledSelector = createSelector(
  mappingLinkSelector,
  mappingLink => {
    if (
      !mappingLink.has(MAPPING_LINK_TYPE_KEY) ||
      !mappingLink.has(MAPPING_LINK_SOURCE_KEY) ||
      !mappingLink.has(MAPPING_LINK_DESTINATION_KEY)
    ) {
      return false;
    }

    if (mappingLink.has('')) {
      return false;
    }

    const valueEmpty = mappingLink.some(
      R.ifElse(
        R.is(Map),
        R.ifElse(
          value => value.has('source'),
          value => value.get('source') === '' || value.get('column') === '',
          R.isNil
        ),
        value => R.isNil(value) || R.isEmpty(value)
      )
    );

    if (valueEmpty) {
      return false;
    }

    return true;
  }
);

export const editingLinkIndexSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('editingLinkIndex')
);
