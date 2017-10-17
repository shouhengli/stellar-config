const actions = require('../../actions');

function revealNew() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_NEW,
  };
}

function hideNew() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_NEW,
  };
}

function setNewName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_NAME,
    name,
  };
}

function revealDelete() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_DELETE,
  };
}

function hideDelete() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_DELETE,
  };
}

function setDeleteName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_DELETE_NAME,
    name,
  };
}

function setSelectedSource(source) {
  return {
    type: actions.INGESTION_PROFILE_SET_SELECTED_SOURCE,
    source,
  };
}

function revealNewSource() {
  return {type: actions.INGESTION_PROFILE_REVEAL_NEW_SOURCE};
}

function hideNewSource() {
  return {type: actions.INGESTION_PROFILE_HIDE_NEW_SOURCE};
}

function setNewSource(source) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_SOURCE,
    source,
  };
}

function revealDeleteSource() {
  return {type: actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE};
}

function hideDeleteSource() {
  return {type: actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE};
}

function setActiveTab(tab) {
  return {
    type: actions.INGESTION_PROFILE_SET_ACTIVE_TAB,
    tab,
  };
}

module.exports = {
  setSelectedSource,
  setNewSource,
  hideDeleteSource,
  revealDeleteSource,
  revealNewSource,
  hideNewSource,
  revealNew,
  hideNew,
  setNewName,
  revealDelete,
  hideDelete,
  setDeleteName,
  setActiveTab,
};
