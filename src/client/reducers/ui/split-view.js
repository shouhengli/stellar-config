import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  selectedClass: null,
  classIndexesToEdit: [],
  classLinkIndexesToEdit: []
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SPLIT_VIEW_CLASS_SELECTED:
      return state
        .set('selectedClass', action.selectedClass)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]));
    case actions.SPLIT_VIEW_CLASS_EDIT_CLASS:
      return state.set('classIndexesToEdit',
        state.get('classIndexesToEdit').push(action.classIndex));
    case actions.SPLIT_VIEW_CLASS_LINK_EDIT_CLASS:
      return state.set('classLinkIndexesToEdit',
        state.get('classLinkIndexesToEdit').push(action.classLinkIndex));
    default:
      return state;
  }
}
