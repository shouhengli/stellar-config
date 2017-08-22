require('whatwg-fetch');
const LOAD_SEARCH_CONFIG_TYPES = 'LOAD_SEARCH_CONFIG_TYPES';
const LOAD_SEARCH_CONFIG_NAMES = 'LOAD_SEARCH_CONFIG_NAMES';
const SET_SEARCH_ACTIVE_CONFIG_TYPE = 'SET_SEARCH_ACTIVE_CONFIG_TYPE';
const LOAD_EDIT_CONFIG = 'LOAD_EDIT_CONFIG';

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

module.exports = {
  LOAD_SEARCH_CONFIG_TYPES,
  LOAD_SEARCH_CONFIG_NAMES,
  SET_SEARCH_ACTIVE_CONFIG_TYPE,
  LOAD_EDIT_CONFIG,
  loadSearchConfigTypesAsync,
  loadSearchConfigNamesAsync,
  setSearchActiveConfigType,
  loadEditConfigAsync,
};
