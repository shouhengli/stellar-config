import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  selectedClass: null,
  classIndexesToEdit: [],
  classLinkIndexesToEdit: [],
  isEditing: false,
  isEditingClassName: false
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SPLIT_VIEW_CLASS_SELECTED:
      return state
        .set('selectedClass', action.selectedClass)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]))
        .set('isEditing', false)
        .set('isEditingClassName', false);
    case actions.SPLIT_VIEW_EDIT_CLASS:
      return state
        .set(
          'classIndexesToEdit',
          state.get('classIndexesToEdit').push(action.classIndex)
        )
        .set('isEditing', true);
    case actions.SPLIT_VIEW_EDIT_CLASS_NAME:
      return state.set('isEditingClassName', true).set('isEditing', true);
    case actions.SPLIT_VIEW_EDIT_CLASS_LINK:
      return state
        .set(
          'classLinkIndexesToEdit',
          state.get('classLinkIndexesToEdit').push(action.classLinkIndex)
        )
        .set('isEditing', true);
    case actions.SPLIT_VIEW_SAVE_EDIT:
      return state
        .set('isEditing', false)
        .set('isEditingClassName', false)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]));
    case actions.SPLIT_VIEW_CANCEL_EDIT:
      return state;
    case actions.SPLIT_VIEW_CLOSE_EDIT:
      return state
        .set('isEditing', false)
        .set('isEditingClassName', false)
        .set('selectedClass', null)
        .set('classIndexesToEdit', fromJS([]))
        .set('classLinkIndexesToEdit', fromJS([]));
    case actions.SPLIT_VIEW_ADD_NEW_ATTRIBUTE: {
      const newAttributeIdx = state.getIn(['selectedClass', 'props']).size + 1;
      return state
        .setIn(
          ['selectedClass', 'props'],
          state
            .getIn(['selectedClass', 'props'])
            .set(`newAttribute${newAttributeIdx}`, 'string')
        )
        .set(
          'classIndexesToEdit',
          state
            .get('classIndexesToEdit')
            .push(state.getIn(['selectedClass', 'props']).size)
        )
        .set('isEditing', true);
    }

    case actions.SPLIT_VIEW_ADD_LINK:
      return state;
    default:
      return state;
  }
}
