require('whatwg-fetch');
const LOAD_CONFIG_TYPES = 'LOAD_CONFIG_TYPES';
const LOAD_CONFIG_NAMES = 'LOAD_CONFIG_NAMES';
const LOAD_CONFIG_CONTENT = 'LOAD_CONFIG_CONTENT';
const SET_ACTIVE_CONFIG_SEARCH_TAB = 'SET_ACTIVE_CONFIG_SEARCH_TAB';
const SET_ACTIVE_CONFIG = 'SET_ACTIVE_CONFIG';

function loadConfigTypes(configTypes) {
  return {
    type: LOAD_CONFIG_TYPES,
    configTypes,
  };
}

function loadConfigTypesAsync() {
  return (dispatch, getState) =>
    fetch('/config')
      .then((response) => response.json())
      .then((configTypes) => dispatch(loadConfigTypes(configTypes)));
}

function loadConfigNames(configType, configNames) {
  return {
    type: LOAD_CONFIG_NAMES,
    configType,
    configNames,
  };
}

function loadConfigNamesAsync(configType) {
  return (dispatch) =>
    fetch(`/config/${configType}`)
      .then((response) => response.json())
      .then((configNames) => dispatch(loadConfigNames(configType, configNames)));
}

function loadConfigContent(configType, configName, configContent) {
  return {
    type: LOAD_CONFIG_CONTENT,
    configType,
    configName,
    configContent,
  };
}

function loadConfigContentAsync(configType, configName) {
  return (dispatch) =>
    fetch(`/config/${configType}/${configName}`)
      .then((response) => response.json())
      .then((configContent) =>
        dispatch(loadConfigContent(configType, configName, configContent))
      );
}

function setActiveConfigSearchTab(activeConfigSearchTab) {
  return {
    type: SET_ACTIVE_CONFIG_SEARCH_TAB,
    activeConfigSearchTab,
  };
}

function setActiveConfig(type, name) {
  return {
    type: SET_ACTIVE_CONFIG,
    activeConfig: {
      type,
      name,
    },
  };
}

module.exports = {
  LOAD_CONFIG_TYPES,
  LOAD_CONFIG_NAMES,
  LOAD_CONFIG_CONTENT,
  SET_ACTIVE_CONFIG_SEARCH_TAB,
  SET_ACTIVE_CONFIG,
  loadConfigTypesAsync,
  loadConfigNamesAsync,
  loadConfigContentAsync,
  setActiveConfigSearchTab,
  setActiveConfig,
};
