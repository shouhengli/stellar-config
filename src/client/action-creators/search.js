const R = require('ramda');
const P = require('bluebird');
const request = require('superagent');

const actions = require('../actions');

function loadSearchConfigTypes(configTypes) {
  return {
    type: actions.LOAD_SEARCH_CONFIG_TYPES,
    configTypes,
  };
}

function loadSearchConfigTypesAsync() {
  return (dispatch) => new P(
    (resolve, reject) => {
      request.get('/config')
             .accept('json')
             .end((error, response) => {
               if (R.isNil(error)) {
                 resolve(response.body);
               } else {
                 reject(error);
               }
             });
    }
  ).then((configTypes) => dispatch(loadSearchConfigTypes(configTypes)));
}

function loadSearchConfigNames(configType, configNames) {
  return {
    type: actions.LOAD_SEARCH_CONFIG_NAMES,
    configType,
    configNames,
  };
}

function loadSearchConfigNamesAsync(configType) {
  return (dispatch) => new P(
    (resolve, reject) => {
      request.get(`/config/${configType}`)
             .accept('json')
             .end((error, response) => {
               if (R.isNil(error)) {
                 resolve(response.body);
               } else {
                 reject(error);
               }
             });
    }
  ).then(
    (configNames) => dispatch(loadSearchConfigNames(configType, configNames))
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
