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

module.exports = {
  newNameSelector,
  newVisibleSelector,
  deleteVisibleSelector,
  deleteNameSelector,
  activeTabSelector,
};
