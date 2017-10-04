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

module.exports = {
  setSelectedSource,
  setNewSource,
  loadGraphSchemasAsync,
  loadSampleAsync,
};
