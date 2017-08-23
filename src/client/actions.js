require('whatwg-fetch');
const LOAD_SEARCH_CONFIG_TYPES = 'LOAD_SEARCH_CONFIG_TYPES';
const LOAD_SEARCH_CONFIG_NAMES = 'LOAD_SEARCH_CONFIG_NAMES';
const SET_SEARCH_ACTIVE_CONFIG_TYPE = 'SET_SEARCH_ACTIVE_CONFIG_TYPE';
const HIDE_SEARCH = 'HIDE_SEARCH';
const REVEAL_SEARCH = 'REVEAL_SEARCH';
const LOAD_EDIT_CONFIG = 'LOAD_EDIT_CONFIG';
const SET_EDIT_CONFIG_CONTENT = 'SET_EDIT_CONFIG_CONTENT';

function loadSearchConfigTypes(configTypes) {
  return {
    type: LOAD_SEARCH_CONFIG_TYPES,
    configTypes,
  };
}

function loadSearchConfigTypesAsync() {
  return (dispatch, getState) =>
    fetch('/config')
      .then((response) => response.json())
      .then((configTypes) => dispatch(loadSearchConfigTypes(configTypes)));
}

function loadSearchConfigNames(configType, configNames) {
  return {
    type: LOAD_SEARCH_CONFIG_NAMES,
    configType,
    configNames,
  };
}

function loadSearchConfigNamesAsync(configType) {
  return (dispatch) =>
    fetch(`/config/${configType}`)
      .then((response) => response.json())
      .then((configNames) => dispatch(loadSearchConfigNames(configType, configNames)));
}

function setSearchActiveConfigType(activeConfigType) {
  return {
    type: SET_SEARCH_ACTIVE_CONFIG_TYPE,
    activeConfigType,
  };
}

function hideSearch() {
  return {type: HIDE_SEARCH};
}

function revealSearch() {
  return {type: REVEAL_SEARCH};
}

function loadEditConfig(configType, configName, configContent) {
  return {
    type: LOAD_EDIT_CONFIG,
    configType,
    configName,
    configContent,
  };
}

function loadEditConfigAsync(configType, configName) {
  return (dispatch) =>
    fetch(`/config/${configType}/${configName}`)
      .then((response) => response.json())
      .then((configContent) =>
        dispatch(loadEditConfig(configType, configName, configContent))
      );
}

function setEditConfigContent(configContent) {
  return {
    type: SET_EDIT_CONFIG_CONTENT,
    configContent,
  };
}

module.exports = {
  LOAD_SEARCH_CONFIG_TYPES,
  LOAD_SEARCH_CONFIG_NAMES,
  SET_SEARCH_ACTIVE_CONFIG_TYPE,
  HIDE_SEARCH,
  REVEAL_SEARCH,
  LOAD_EDIT_CONFIG,
  SET_EDIT_CONFIG_CONTENT,
  loadSearchConfigTypesAsync,
  loadSearchConfigNamesAsync,
  setSearchActiveConfigType,
  hideSearch,
  revealSearch,
  loadEditConfigAsync,
  setEditConfigContent,
};
