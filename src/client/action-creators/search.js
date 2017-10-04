const actions = require('../actions');
const api = require('../api');

function loadSearchConfigTypes(configTypes) {
  return {
    type: actions.LOAD_SEARCH_CONFIG_TYPES,
    configTypes,
  };
}

function loadSearchConfigTypesAsync() {
  return (dispatch) => api
    .getConfigTypes()
    .then((configTypes) =>
      dispatch(loadSearchConfigTypes(configTypes))
    );
}

function loadSearchConfigNames(configType, configNames) {
  return {
    type: actions.LOAD_SEARCH_CONFIG_NAMES,
    configType,
    configNames,
  };
}

function loadSearchConfigNamesAsync(configType) {
  return (dispatch) => api
    .getConfigNames(configType)
    .then((configNames) =>
      dispatch(loadSearchConfigNames(configType, configNames))
    );
}

function setSearchActiveConfigType(activeConfigType) {
  return {
    type: actions.SET_SEARCH_ACTIVE_CONFIG_TYPE,
    activeConfigType,
  };
}

function setSearchText(searchText) {
  return {
    type: actions.SET_SEARCH_TEXT,
    searchText,
  };
}

function hideSearch() {
  return {type: actions.HIDE_SEARCH};
}

function revealSearch() {
  return {type: actions.REVEAL_SEARCH};
}

module.exports ={
  loadSearchConfigTypesAsync,
  loadSearchConfigNamesAsync,
  setSearchActiveConfigType,
  setSearchText,
  hideSearch,
  revealSearch,
};
