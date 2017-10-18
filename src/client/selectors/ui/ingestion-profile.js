const newNameSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'newName']);

const newVisibleSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'newVisible']);

const deleteVisibleSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'deleteVisible']);

const deleteNameSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'deleteName']);

const activeTabSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'activeTab']);

const newSourceVisibleSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'newSourceVisible']);

const newSourceSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'newSource']);

const deleteSourceVisibleSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'deleteSourceVisible']);

const selectedSourceSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'selectedSource']);

const sampleSelector = (state) =>
  state.getIn(['ui', 'ingestionProfile', 'sample']);

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
  sampleSelector,
};
