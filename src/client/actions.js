require('whatwg-fetch');

const LOAD_SEARCH_CONFIG_TYPES = 'LOAD_SEARCH_CONFIG_TYPES';
const LOAD_SEARCH_CONFIG_NAMES = 'LOAD_SEARCH_CONFIG_NAMES';
const SET_SEARCH_ACTIVE_CONFIG_TYPE = 'SET_SEARCH_ACTIVE_CONFIG_TYPE';
const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
const HIDE_SEARCH = 'HIDE_SEARCH';
const REVEAL_SEARCH = 'REVEAL_SEARCH';
const LOAD_EDIT_CONFIG = 'LOAD_EDIT_CONFIG';
const SET_EDIT_CONFIG_CONTENT = 'SET_EDIT_CONFIG_CONTENT';
const SET_EDIT_CONFIG_STATUS = 'SET_EDIT_CONFIG_STATUS';
const RESET_EDIT_CONFIG = 'RESET_EDIT_CONFIG';
const REVEAL_NEW_CONFIG = 'REVEAL_NEW_CONFIG';
const HIDE_NEW_CONFIG = 'HIDE_NEW_CONFIG';
const SET_NEW_CONFIG_TYPE = 'SET_NEW_CONFIG_TYPE';
const SET_NEW_CONFIG_NAME = 'SET_NEW_CONFIG_NAME';
const ADD_NEW_CONFIG = 'ADD_NEW_CONFIG';
const REVEAL_CONFIG_DELETE = 'REVEAL_CONFIG_DELETE';
const HIDE_CONFIG_DELETE = 'HIDE_CONFIG_DELETE';
const SET_CONFIG_DELETE_NAME = 'SET_CONFIG_DELETE_NAME';

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

function setSearchText(searchText) {
  return {
    type: SET_SEARCH_TEXT,
    searchText,
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

function setEditConfigStatus(configStatus) {
  return {
    type: SET_EDIT_CONFIG_STATUS,
    configStatus,
  };
}

function resetEditConfig() {
  return {
    type: RESET_EDIT_CONFIG,
  };
}

function saveEditConfigAsync(configType, configName, configContent) {
  return (dispatch) =>
    fetch(`/config/${configType}/${configName}`, {
      method: 'POST',
      headers: {'CONTENT-TYPE': 'application/json'},
      body: JSON.stringify({content: configContent}),
    });
}

function revealNewConfig() {
  return {
    type: REVEAL_NEW_CONFIG,
  };
}

function hideNewConfig() {
  return {
    type: HIDE_NEW_CONFIG,
  };
}

function setNewConfigType(configType) {
  return {
    type: SET_NEW_CONFIG_TYPE,
    configType,
  };
}

function setNewConfigName(configName) {
  return {
    type: SET_NEW_CONFIG_NAME,
    configName,
  };
}

function addNewConfig(configType, configName) {
  return {
    type: ADD_NEW_CONFIG,
    configType,
    configName,
  };
}

function deleteConfigAsync(configType, configName) {
  return (dispatch) =>
    fetch(`/config/${configType}/${configName}`, {method: 'DELETE'});
}

function revealConfigDelete() {
  return {
    type: REVEAL_CONFIG_DELETE,
  };
}

function hideConfigDelete() {
  return {
    type: HIDE_CONFIG_DELETE,
  };
}

function setConfigDeleteName(configName) {
  return {
    type: SET_CONFIG_DELETE_NAME,
    configName,
  };
}

module.exports = {
  LOAD_SEARCH_CONFIG_TYPES,
  LOAD_SEARCH_CONFIG_NAMES,
  SET_SEARCH_ACTIVE_CONFIG_TYPE,
  SET_SEARCH_TEXT,
  HIDE_SEARCH,
  REVEAL_SEARCH,
  LOAD_EDIT_CONFIG,
  SET_EDIT_CONFIG_CONTENT,
  SET_EDIT_CONFIG_STATUS,
  RESET_EDIT_CONFIG,
  REVEAL_NEW_CONFIG,
  HIDE_NEW_CONFIG,
  SET_NEW_CONFIG_TYPE,
  SET_NEW_CONFIG_NAME,
  ADD_NEW_CONFIG,
  REVEAL_CONFIG_DELETE,
  HIDE_CONFIG_DELETE,
  SET_CONFIG_DELETE_NAME,
  loadSearchConfigTypesAsync,
  loadSearchConfigNamesAsync,
  setSearchActiveConfigType,
  setSearchText,
  hideSearch,
  revealSearch,
  loadEditConfigAsync,
  setEditConfigContent,
  setEditConfigStatus,
  resetEditConfig,
  saveEditConfigAsync,
  revealNewConfig,
  hideNewConfig,
  setNewConfigType,
  setNewConfigName,
  addNewConfig,
  revealConfigDelete,
  hideConfigDelete,
  deleteConfigAsync,
  setConfigDeleteName,
};
