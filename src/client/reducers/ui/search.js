const {fromJS} = require('immutable');
const actions = require('../../actions');

const initialState = fromJS({
  names: [],
  activeType: null,
  visible: false,
  text: '',
});

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SEARCH_LOAD_CONFIG_NAMES:
      return state.set('names', fromJS(action.configNames));

    case actions.SEARCH_SET_ACTIVE_CONFIG_TYPE:
      return state.set('activeType', action.activeConfigType);

    case actions.SEARCH_SET_TEXT:
      return state.set('text', action.searchText);

    case actions.SEARCH_HIDE:
      return state.set('visible', false);

    case actions.SEARCH_REVEAL:
      return state.set('visible', true);

    default:
      return state;
  }
}

module.exports = reduce;
