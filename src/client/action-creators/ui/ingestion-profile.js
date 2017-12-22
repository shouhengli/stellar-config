const P = require('bluebird');
const R = require('ramda');
import { getIngestionSample } from '../../api';
import actions from '../../actions';

function revealNew() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_NEW
  };
}

function hideNew() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_NEW
  };
}

function setNewName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_NAME,
    name
  };
}

function revealDelete() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_DELETE
  };
}

function hideDelete() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_DELETE
  };
}

function setDeleteName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_DELETE_NAME,
    name
  };
}

function setSelectedSource(source) {
  return {
    type: actions.INGESTION_PROFILE_SET_SELECTED_SOURCE,
    source
  };
}

function revealNewSource() {
  return { type: actions.INGESTION_PROFILE_REVEAL_NEW_SOURCE };
}

function hideNewSource() {
  return { type: actions.INGESTION_PROFILE_HIDE_NEW_SOURCE };
}

function setNewSource(source) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_SOURCE,
    source
  };
}

function revealDeleteSource() {
  return { type: actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE };
}

function hideDeleteSource() {
  return { type: actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE };
}

function setActiveTab(tab) {
  return {
    type: actions.INGESTION_PROFILE_SET_ACTIVE_TAB,
    tab
  };
}

function addSample(source, sample) {
  return {
    type: actions.INGESTION_PROFILE_ADD_SAMPLE,
    source,
    sample
  };
}

function addSampleAsync(source) {
  return dispatch =>
    getIngestionSample(source).then(
      R.partial(R.compose(dispatch, addSample), [source])
    );
}

function loadSamples(samples) {
  return {
    type: actions.INGESTION_PROFILE_LOAD_SAMPLES,
    samples
  };
}

function loadSamplesAsync(sources) {
  return dispatch =>
    P.all(sources.toJS().map(getIngestionSample))
      .then(samples => R.pipe(R.zip, R.fromPairs)(sources.toJS(), samples))
      .then(R.compose(dispatch, loadSamples));
}

function revealNewNode() {
  return { type: actions.INGESTION_PROFILE_REVEAL_NEW_NODE };
}

function toggleMappingNodeActivePropKey(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_KEY,
    key
  };
}

function toggleMappingNodeActivePropValue(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_VALUE,
    key
  };
}

function addMappingNodeProp() {
  return { type: actions.INGESTION_PROFILE_ADD_MAPPING_NODE_PROP };
}

function deleteMappingNodeProp(key) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_MAPPING_NODE_PROP,
    key
  };
}

function setMappingNodePropKey(key, prevKey) {
  return {
    type: actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_KEY,
    key,
    prevKey
  };
}

function setMappingNodePropValue(key, value, shouldResetActiveProp = true) {
  return {
    type: actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_VALUE,
    key,
    value,
    shouldResetActiveProp
  };
}

function resetMappingNode() {
  return { type: actions.INGESTION_PROFILE_RESET_MAPPING_NODE };
}

function editMappingNode(node, index) {
  return {
    type: actions.INGESTION_PROFILE_EDIT_MAPPING_NODE,
    node,
    index
  };
}

function revealNewLink() {
  return { type: actions.INGESTION_PROFILE_REVEAL_NEW_LINK };
}

function toggleMappingLinkActivePropKey(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_KEY,
    key
  };
}

function toggleMappingLinkActivePropValue(key) {
  return {
    type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_VALUE,
    key
  };
}

function setMappingLinkPropValue(key, value, shouldResetActiveLink = true) {
  return {
    type: actions.INGESTION_PROFILE_SET_MAPPING_LINK_PROP_VALUE,
    key,
    value,
    shouldResetActiveLink
  };
}

function resetMappingLink() {
  return { type: actions.INGESTION_PROFILE_RESET_MAPPING_LINK };
}

function deleteMappingLinkProp(key) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_MAPPING_LINK_PROP,
    key
  };
}

function addMappingLinkProp() {
  return { type: actions.INGESTION_PROFILE_ADD_MAPPING_LINK_PROP };
}

function setMappingLinkPropKey(key, prevKey) {
  return {
    type: actions.INGESTION_PROFILE_SET_MAPPING_LINK_PROP_KEY,
    key,
    prevKey
  };
}

function editMappingLink(link, index) {
  return {
    type: actions.INGESTION_PROFILE_EDIT_MAPPING_LINK,
    link,
    index
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
  toggleMappingNodeActivePropKey,
  toggleMappingNodeActivePropValue,
  addMappingNodeProp,
  deleteMappingNodeProp,
  setMappingNodePropKey,
  setMappingNodePropValue,
  resetMappingNode,
  editMappingNode,
  revealNewLink,
  toggleMappingLinkActivePropKey,
  toggleMappingLinkActivePropValue,
  setMappingLinkPropValue,
  resetMappingLink,
  deleteMappingLinkProp,
  addMappingLinkProp,
  setMappingLinkPropKey,
  editMappingLink
};
