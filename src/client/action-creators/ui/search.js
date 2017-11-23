const R = require('ramda');
const actions = require('../../actions');
const api = require('../../api');

function loadSearchNames(configType, configNames) {
  return {
    type: actions.SEARCH_LOAD_NAMES,
    configType,
    configNames
  };
}

function loadSearchNamesAsync(configType) {
  return dispatch =>
    R.pipeP(
      api.getConfigNames,
      R.compose(dispatch, R.curry(loadSearchNames)(configType))
    )(configType);
}

function setSearchText(searchText) {
  return {
    type: actions.SEARCH_SET_TEXT,
    searchText
  };
}

function hideSearch() {
  return { type: actions.SEARCH_HIDE };
}

function revealSearch() {
  return { type: actions.SEARCH_REVEAL };
}

module.exports = {
  loadSearchNamesAsync,
  setSearchText,
  hideSearch,
  revealSearch
};
