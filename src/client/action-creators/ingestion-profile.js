const P = require('bluebird');
const R = require('ramda');
const actions = require('../actions');
const api = require('../api');
const {INGESTION_PROFILE_CONFIG_TYPE} = require('../ingestion-profile');

function load(name, content) {
  return {
    type: actions.INGESTION_PROFILE_LOAD,
    name,
    content,
  };
}

function loadAsync(name) {
  return (dispatch) => api
    .getConfig(INGESTION_PROFILE_CONFIG_TYPE, name)
    .then((content) =>
      dispatch(load(name, content))
    );
}

function saveAsync(name, content) {
  return (dispatch) => P
    .try(() => dispatch({type: actions.INGESTION_PROFILE_SAVE}))
    .then(() => api.postConfig(INGESTION_PROFILE_CONFIG_TYPE, name, content))
    .then(() => dispatch({type: actions.INGESTION_PROFILE_SAVE_SUCCESS}));
}

function revealNewConfig() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_NEW,
  };
}

function hideNewConfig() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_NEW,
  };
}

function setNewConfigName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_NAME,
    name,
  };
}

function reset() {
  return {type: actions.INGESTION_PROFILE_RESET};
}

function deleteFileAsync(name) {
  return (dispatch) => api
    .deleteConfig(INGESTION_PROFILE_CONFIG_TYPE, name)
    .then(() => dispatch(reset()));
}

function revealDeleteConfig() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_DELETE,
  };
}

function hideDeleteConfig() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_DELETE,
  };
}

function setDeleteConfigName(name) {
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

function addSource(source) {
  return {
    type: actions.INGESTION_PROFILE_ADD_SOURCE,
    source,
  };
}

function loadSample(sample) {
  return {
    type: actions.INGESTION_PROFILE_LOAD_SAMPLE,
    sample,
  };
}

function loadSampleAsync(source) {
  return (dispatch) => api
    .getIngestionSample(source)
    .then(R.compose(dispatch, loadSample));
}

function revealDeleteSource() {
  return {type: actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE};
}

function hideDeleteSource() {
  return {type: actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE};
}

module.exports = {
  setSelectedSource,
  setNewSource,
  loadSample,
  loadSampleAsync,
  hideDeleteSource,
  revealDeleteSource,
  revealNewSource,
  hideNewSource,
  load,
  loadAsync,
  saveAsync,
  revealNewConfig,
  hideNewConfig,
  setNewConfigName,
  revealDeleteConfig,
  hideDeleteConfig,
  deleteFileAsync,
  setDeleteConfigName,
  addSource,
};
