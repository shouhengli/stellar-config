const actions = require('../actions');

function setSelectedSource(selectedSource) {
  return {
    type: actions.SET_INGESTION_PROFILE_SELECTED_SOURCE,
    selectedSource,
  };
}

function setNewSource(newSource) {
  return {
    type: actions.SET_INGESTION_PROFILE_NEW_SOURCE,
    newSource,
  };
}

module.exports = {
  setSelectedSource,
  setNewSource,
};
