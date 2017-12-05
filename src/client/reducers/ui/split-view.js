import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  selectedClass: null
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SPLIT_VIEW_CLASS_SELECTED:
      return state.set('selectedClass', action.selectedClass);
    default:
      return state;
  }
}
