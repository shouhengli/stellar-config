const {Map, List} = require('immutable');
const R = require('ramda');
const {createSelector} = require('reselect');

const ingestionProfileUiSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile']);

const newNameSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newName')
);

const newVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newVisible')
);

const deleteVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('deleteVisible')
);

const deleteNameSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('deleteName')
);

const activeTabSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('activeTab')
);

const newSourceVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newSourceVisible')
);

const newSourceSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newSource')
);

const deleteSourceVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('deleteSourceVisible')
);

const selectedSourceSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('selectedSource')
);

const samplesSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('samples')
);

const sampleOfSelectedSourceSelector = createSelector(
  samplesSelector,
  selectedSourceSelector,
  (samples, selectedSource) => samples.get(selectedSource)
);

const newNodeVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newNodeVisible')
);

const newLinkVisibleSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newLinkVisible')
);

const newNodeSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newNode')
);

const newNodeActivePropSelector = createSelector(
  ingestionProfileUiSelector,
  (ingestionProfileUi) => ingestionProfileUi.get('newNodeActiveProp')
);

const columnOptionsSelector = createSelector(
  samplesSelector,
  newNodeSelector,
  newNodeActivePropSelector,
  (samples, newNode, activeProp) =>
    samples.getIn(
      [
        newNode.getIn([activeProp.get('key'), 'source'], ''),
        'headers',
      ],
      List()
    )
);

const newNodeSaveEnabledSelector = createSelector(
  newNodeSelector,
  (newNode) => {
    if (newNode.has('')) {
      return false;
    }

    const valueEmpty = newNode.some(
      R.ifElse(
        R.is(Map),
        (value) => value.get('source') === '' || value.get('column') === '',
        (value) => R.isNil(value) || R.isEmpty(value)
      )
    );

    if (valueEmpty) {
      return false;
    }

    return true;
  }
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
  newLinkVisibleSelector,
  newNodeSelector,
  newNodeActivePropSelector,
  columnOptionsSelector,
  newNodeSaveEnabledSelector,
};
