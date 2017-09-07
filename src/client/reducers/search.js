const R = require('ramda');
const {fromJS} = require('immutable');
const actions = require('../actions');

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

module.exports = reduceSearchState;
