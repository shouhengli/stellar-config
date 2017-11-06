const P = require('bluebird');
const R = require('ramda');
const api = require('../../api');
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

function addSample(source, sample) {
  return {
    type: actions.INGESTION_PROFILE_ADD_SAMPLE,
    source,
    sample,
  };
}

function addSampleAsync(source) {
  return (dispatch) => api
    .getIngestionSample(source)
    .then(R.partial(R.compose(dispatch, addSample), [source]));
}

function loadSamples(samples) {
  return {
    type: actions.INGESTION_PROFILE_LOAD_SAMPLES,
    samples,
  };
}

function loadSamplesAsync(sources) {
  return (dispatch) => P
    .all(sources.toJS().map(api.getIngestionSample))
    .then((samples) => R.pipe(R.zip, R.fromPairs)(sources.toJS(), samples))
    .then(R.compose(dispatch, loadSamples));
}

function revealNewNode() {
  return {type: actions.INGESTION_PROFILE_REVEAL_NEW_NODE};
}

function toggleNewNodeActivePropKey(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_NEW_NODE_ACTIVE_PROP_KEY,
    key,
  };
}

function toggleNewNodeActivePropValue(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_NEW_NODE_ACTIVE_PROP_VALUE,
    key,
  };
}

function addNewNodeProp() {
  return {type: actions.INGESTION_PROFILE_ADD_NEW_NODE_PROP};
}

function deleteNewNodeProp(key) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_NEW_NODE_PROP,
    key,
  };
}

function setNewNodePropKey(key, prevKey) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_NODE_PROP_KEY,
    key,
    prevKey,
  };
}

function setNewNodePropValue(key, value, shouldResetActiveProp = true) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_NODE_PROP_VALUE,
    key,
    value,
    shouldResetActiveProp,
  };
}

function resetNewNode() {
  return {type: actions.INGESTION_PROFILE_RESET_NEW_NODE};
}

function revealNewLink() {
  return {type: actions.INGESTION_PROFILE_REVEAL_NEW_LINK};
}

function toggleNewLinkActivePropKey(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_NEW_LINK_ACTIVE_PROP_KEY,
    key,
  };
}

function toggleNewLinkActivePropValue(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_NEW_LINK_ACTIVE_PROP_VALUE,
    key,
  };
}

function setNewLinkPropValue(key, value, shouldResetActiveLink = true) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_LINK_PROP_VALUE,
    key,
    value,
    shouldResetActiveLink,
  };
}

function resetNewLink() {
  return {type: actions.INGESTION_PROFILE_RESET_NEW_LINK};
}

function deleteNewLinkProp(key) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_NEW_LINK_PROP,
    key,
  };
}

function addNewLinkProp() {
  return {type: actions.INGESTION_PROFILE_ADD_NEW_LINK_PROP};
}

function setNewLinkPropKey(key, prevKey) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_LINK_PROP_KEY,
    key,
    prevKey,
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
  loadSamplesAsync,
  addSampleAsync,
  revealNewNode,
  toggleNewNodeActivePropKey,
  toggleNewNodeActivePropValue,
  addNewNodeProp,
  deleteNewNodeProp,
  setNewNodePropKey,
  setNewNodePropValue,
  resetNewNode,
  revealNewLink,
  toggleNewLinkActivePropKey,
  toggleNewLinkActivePropValue,
  setNewLinkPropValue,
  resetNewLink,
  deleteNewLinkProp,
  addNewLinkProp,
  setNewLinkPropKey,
};
