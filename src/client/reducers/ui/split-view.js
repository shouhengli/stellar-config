import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  selectedClass: null,
  classIndexesToEdit: [],
  classLinkIndexesToEdit: [],
  isEditing: false
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SPLIT_VIEW_CLASS_SELECTED:
      return state
        .set('selectedClass', action.selectedClass)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]));
    case actions.SPLIT_VIEW_EDIT_CLASS:
      return state.set('classIndexesToEdit',
        state.get('classIndexesToEdit').push(action.classIndex))
        .set('isEditing', true);
    case actions.SPLIT_VIEW_EDIT_CLASS_LINK:
      return state.set('classLinkIndexesToEdit',
        state.get('classLinkIndexesToEdit').push(action.classLinkIndex))
        .set('isEditing', true);
    case actions.SPLIT_VIEW_SAVE_EDIT:
      return state.set('isEditing', false)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]));
    case actions.SPLIT_VIEW_CANCEL_EDIT:
      return state.set('isEditing', false)
        .set('selectedClass', null)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]));
    default:
      return state;
  }
}
