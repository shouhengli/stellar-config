const P = require('bluebird');
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

function reset() {
  return {type: actions.INGESTION_PROFILE_RESET};
}

function deleteAsync(name) {
  return (dispatch) => api
    .deleteConfig(INGESTION_PROFILE_CONFIG_TYPE, name)
    .then(() => dispatch(reset()));
}

function addSource(source) {
  return {
    type: actions.INGESTION_PROFILE_ADD_SOURCE,
    source,
  };
}

function deleteSource(source) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_SOURCE,
    source,
  };
}

module.exports = {
  load,
  loadAsync,
  saveAsync,
  deleteAsync,
  addSource,
  deleteSource,
};
