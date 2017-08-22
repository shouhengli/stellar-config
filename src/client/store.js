const R = require('ramda');
const {fromJS} = require('immutable');
const actions = require('./actions');

const initialSearchState = fromJS({
  types: [],
  names: [],
  activeType: null,
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

    default:
      return state;
  }
}

const initialEditState = fromJS({
  type: null,
  name: null,
  content: null,
});

function reduceEditState(state = initialEditState, action) {
  switch (action.type) {
    case actions.LOAD_EDIT_CONFIG:
      return state
        .set('type', action.configType)
        .set('name', action.configName)
        .set('content', action.configContent);

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
  }),
  applyMiddleware(thunk)
);
