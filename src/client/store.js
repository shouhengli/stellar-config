const R = require('ramda');
const {fromJS} = require('immutable');
const actions = require('./actions');

const initialConfigState = fromJS({types: [], names: {}, contents: {}});

function reduceConfigState(state = initialConfigState, action) {
  switch (action.type) {
    case actions.LOAD_CONFIG_TYPES:
      return state.set('types', fromJS(action.configTypes));
    case actions.LOAD_CONFIG_NAMES:
      return state.setIn(['names', action.configType], fromJS(action.configNames));
    case actions.LOAD_CONFIG_CONTENT:
      return state.setIn(['contents', action.configType, action.configName], action.configContent);
    default:
      return state;
  }
}

const initialUiState = fromJS({
  activeConfigSearchTab: null,
  activeConfig: {},
});

function reduceUiState(state = initialUiState, action) {
  switch (action.type) {
    case actions.LOAD_CONFIG_TYPES: {
      const activeConfigSearchTab = state.getIn(['ui', 'activeConfigSearchTab']);

      if (action.configTypes.length > 0
          && !R.contains(activeConfigSearchTab, action.configTypes)) {
        return state.set('activeConfigSearchTab', action.configTypes[0]);
      }

      return state;
    }
    case actions.SET_ACTIVE_CONFIG_SEARCH_TAB:
      return state.set('activeConfigSearchTab', action.activeConfigSearchTab);
    case actions.SET_ACTIVE_CONFIG:
      return state.set('activeConfig', fromJS(action.activeConfig));
    default:
      return state;
  }
}

const {createStore, applyMiddleware} = require('redux');
const {combineReducers} = require('redux-immutable');
const thunk = require('redux-thunk').default;

module.exports = createStore(
  combineReducers({
    config: reduceConfigState,
    ui: reduceUiState,
  }),
  applyMiddleware(thunk)
);
