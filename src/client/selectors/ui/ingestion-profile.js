const { Map, List } = require('immutable');
const R = require('ramda');
const { createSelector } = require('reselect');

const {
  MAPPING_NODE_ID_KEY,
  MAPPING_NODE_TYPE_KEY,
  MAPPING_LINK_TYPE_KEY,
  MAPPING_LINK_SOURCE_KEY,
  MAPPING_LINK_DESTINATION_KEY
} = require('../../ingestion-profile');

const ingestionProfileUiSelector = state =>
  state.getIn(['ui', 'ingestionProfile']);

const newNameSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newName')
);

const newVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newVisible')
);

const deleteVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('deleteVisible')
);

const deleteNameSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('deleteName')
);

const activeTabSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('activeTab')
);

const newSourceVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newSourceVisible')
);

const newSourceSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newSource')
);

const deleteSourceVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('deleteSourceVisible')
);

const selectedSourceSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('selectedSource')
);

const samplesSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('samples')
);

const sampleOfSelectedSourceSelector = createSelector(
  samplesSelector,
  selectedSourceSelector,
  (samples, selectedSource) => samples.get(selectedSource)
);

const newNodeVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newNodeVisible')
);

const newLinkVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('newLinkVisible')
);

const mappingNodeSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingNode')
);

const mappingNodeActivePropSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingNodeActiveProp')
);

const mappingNodeColumnOptionsSelector = createSelector(
  samplesSelector,
  mappingNodeSelector,
  mappingNodeActivePropSelector,
  (samples, mappingNode, activeProp) =>
    samples.getIn(
      [mappingNode.getIn([activeProp.get('key'), 'source'], ''), 'headers'],
      List()
    )
);

const mappingNodeSaveEnabledSelector = createSelector(
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

const editingNodeIndexSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('editingNodeIndex')
);

const mappingLinkSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingLink')
);

const mappingLinkActivePropSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('mappingLinkActiveProp')
);

const mappingLinkColumnOptionsSelector = createSelector(
  samplesSelector,
  mappingLinkSelector,
  mappingLinkActivePropSelector,
  (samples, newNode, activeProp) =>
    samples.getIn(
      [newNode.getIn([activeProp.get('key'), 'source'], ''), 'headers'],
      List()
    )
);

const mappingLinkSaveEnabledSelector = createSelector(
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

const editingLinkIndexSelector = createSelector(
  ingestionProfileUiSelector,
  ingestionProfileUi => ingestionProfileUi.get('editingLinkIndex')
);

module.exports = {
  newNameSelector,
  newVisibleSelector,
  deleteVisibleSelector,
  deleteNameSelector,
  activeTabSelector,
  newSourceVisibleSelector,
  newSourceSelector,
  deleteSourceVisibleSelector,
  selectedSourceSelector,
  samplesSelector,
  sampleOfSelectedSourceSelector,
  newNodeVisibleSelector,
  mappingNodeSelector,
  mappingNodeActivePropSelector,
  mappingNodeColumnOptionsSelector,
  mappingNodeSaveEnabledSelector,
  editingNodeIndexSelector,
  newLinkVisibleSelector,
  mappingLinkSelector,
  mappingLinkActivePropSelector,
  mappingLinkColumnOptionsSelector,
  mappingLinkSaveEnabledSelector,
  editingLinkIndexSelector
};
