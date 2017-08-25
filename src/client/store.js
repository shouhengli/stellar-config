const R = require('ramda');
const {fromJS} = require('immutable');
const actions = require('./actions');
const {CONFIG_STATUS_NORMAL, CONFIG_STATUS_CHANGED} = require('./config-status');

const initialSearchState = fromJS({
  types: [],
  names: [],
  activeType: null,
  visible: false,
  text: '',
});

function reduceSearchState(state = initialSearchState, action) {
  switch (action.type) {
    case actions.LOAD_SEARCH_CONFIG_TYPES:
      if (action.configTypes.length > 0
          && !R.contains(state.get('activeType'), action.configTypes)) {
        state = state.set('activeType', action.configTypes[0]);
      }

      return state.set('types', fromJS(action.configTypes));

    case actions.LOAD_SEARCH_CONFIG_NAMES:
      return state.set('names', fromJS(action.configNames));

    case actions.SET_SEARCH_ACTIVE_CONFIG_TYPE:
      return state.set('activeType', action.activeConfigType);

    case actions.SET_SEARCH_TEXT:
      return state.set('text', action.searchText);

    case actions.HIDE_SEARCH:
      return state.set('visible', false);

    case actions.REVEAL_SEARCH:
      return state.set('visible', true);

    default:
      return state;
  }
}

const initialEditState = fromJS({
  type: null,
  name: null,
  content: '',
  status: CONFIG_STATUS_NORMAL,
});

function reduceEditState(state = initialEditState, action) {
  switch (action.type) {
    case actions.LOAD_EDIT_CONFIG:
      return state
        .set('type', action.configType)
        .set('name', action.configName)
        .set('content', action.configContent);

    case actions.SET_EDIT_CONFIG_CONTENT:
      return state
        .set('content', action.configContent)
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.SET_EDIT_CONFIG_STATUS:
      return state.set('status', action.configStatus);

    case actions.RESET_EDIT_CONFIG:
      return state
        .set('type', null)
        .set('name', null)
        .set('content', '')
        .set('status', CONFIG_STATUS_NORMAL);

    case actions.ADD_NEW_CONFIG:
      return state
        .set('type', action.configType)
        .set('name', action.configName)
        .set('content', '')
        .set('status', CONFIG_STATUS_NORMAL);

    default:
      return state;
  }
}

const initialUiState = fromJS({
  newConfigVisible: false,
  newConfigType: '',
  newConfigName: '',
  configDeleteVisible: false,
  configDeleteName: '',
});

function reduceUiState(state = initialUiState, action) {
  switch (action.type) {
    case actions.REVEAL_NEW_CONFIG:
      return state.set('newConfigVisible', true);

    case actions.HIDE_NEW_CONFIG:
      return state.set('newConfigVisible', false);

    case actions.SET_NEW_CONFIG_TYPE:
      return state.set('newConfigType', action.configType);

    case actions.SET_NEW_CONFIG_NAME:
      return state.set('newConfigName', action.configName);

    case actions.ADD_NEW_CONFIG:
      return state
        .set('newConfigType', '')
        .set('newConfigName', '');

    case actions.HIDE_CONFIG_DELETE:
      return state.set('configDeleteVisible', false);

    case actions.REVEAL_CONFIG_DELETE:
      return state.set('configDeleteVisible', true);

    case actions.SET_CONFIG_DELETE_NAME:
      return state.set('configDeleteName', action.configName);

    default:
      return state;
  }
}

const {createStore, applyMiddleware} = require('redux');
const {combineReducers} = require('redux-immutable');
const thunk = require('redux-thunk').default;

module.exports = createStore(
  combineReducers({
    search: reduceSearchState,
    edit: reduceEditState,
    ui: reduceUiState,
  }),
  applyMiddleware(thunk)
);
