import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  selectedClass: null,
  classAttributeIndexesToEdit: [],
  classLinkIndexesToEdit: [],
  isEditing: false,
  isEditingClassName: false
});

const clearEditingStatus = state => {
  return state
    .set('classAttributeIndexesToEdit', fromJS([]))
    .set('classLinkIndexesToEdit', fromJS([]))
    .set('isEditing', false)
    .set('isEditingClassName', false);
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.SPLIT_VIEW_CLASS_SELECTED:
      return clearEditingStatus(state).set(
        'selectedClass',
        action.selectedClass
      );
    case actions.SPLIT_VIEW_EDIT_CLASS:
      return state.set(
        'classAttributeIndexesToEdit',
        state.get('classAttributeIndexesToEdit').push(action.classIndex)
      );
    case actions.SPLIT_VIEW_EDIT_CLASS_NAME:
      return state.set('isEditingClassName', true);
    case actions.SPLIT_VIEW_EDIT_CLASS_LINK:
      return state.set(
        'classLinkIndexesToEdit',
        state.get('classLinkIndexesToEdit').push(action.classLinkIndex)
      );
    case actions.SPLIT_VIEW_SAVE_EDIT:
      return clearEditingStatus(state);
    case actions.SPLIT_VIEW_CANCEL_EDIT:
      return clearEditingStatus(state);
    case actions.SPLIT_VIEW_CLOSE_EDIT:
      return clearEditingStatus(state).set('selectedClass', null);
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
          'classAttributeIndexesToEdit',
          state
            .get('classAttributeIndexesToEdit')
            .push(state.getIn(['selectedClass', 'props']).size)
        );
    }
    case actions.SPLIT_VIEW_ADD_LINK:
      return state;
    case actions.CLASS_EDITOR_CLASS_EDITED:
      return state.set('isEditing', true);
    case actions.CLASS_EDITOR_UPDATE_CLASS_NAME:
      return state.setIn(['selectedClass', 'name'], action.name);
    default:
      return state;
  }
}
