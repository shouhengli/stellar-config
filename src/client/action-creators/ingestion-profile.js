const R = require('ramda');
const actions = require('../actions');
const api = require('../api');
const {GRAPH_SCHEMA_CONFIG_TYPE} = require('../graph-schema');

function setSelectedSource(selectedSource) {
  return {
    type: actions.SET_INGESTION_PROFILE_SELECTED_SOURCE,
    selectedSource,
  };
}

function revealNewSource() {
  return {type: actions.REVEAL_INGESTION_PROFILE_NEW_SOURCE};
}

function hideNewSource() {
  return {type: actions.HIDE_INGESTION_PROFILE_NEW_SOURCE};
}

function setNewSource(newSource) {
  return {
    type: actions.SET_INGESTION_PROFILE_NEW_SOURCE,
    newSource,
  };
}

function loadGraphSchemas(graphSchemas) {
  return {
    type: actions.LOAD_INGESTION_PROFILE_GRAPH_SCHEMAS,
    graphSchemas,
  };
}

function loadGraphSchemasAsync() {
  return (dispatch) => api
    .getConfigNames(GRAPH_SCHEMA_CONFIG_TYPE)
    .then(R.compose(dispatch, loadGraphSchemas));
}

function loadSample(sample) {
  return {
    type: actions.LOAD_INGESTION_PROFILE_SAMPLE,
    sample,
  };
}

function loadSampleAsync(sourceUri) {
  return (dispatch) => api
    .getIngestionSample(sourceUri)
    .then(R.compose(dispatch, loadSample));
}

function revealSourceDelete() {
  return {type: actions.REVEAL_INGESTION_PROFILE_SOURCE_DELETE};
}

function hideSourceDelete() {
  return {type: actions.HIDE_INGESTION_PROFILE_SOURCE_DELETE};
}

module.exports = {
  setSelectedSource,
  setNewSource,
  loadSample,
  loadGraphSchemasAsync,
  loadSampleAsync,
  hideSourceDelete,
  revealSourceDelete,
  revealNewSource,
  hideNewSource,
};
