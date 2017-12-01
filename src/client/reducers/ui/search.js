import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  names: [],
  visible: false,
  text: ''
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SEARCH_LOAD_NAMES:
      return state.set('names', fromJS(action.configNames));

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
