import { fromJS } from 'immutable';
import actions from '../../actions';

const initialState = fromJS({
  selectedClass: null,
  selectedClassBackUp: null,
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
      return clearEditingStatus(state)
        .set('selectedClass', action.selectedClass)
        .set('selectedClassBackUp', action.selectedClass);
    case actions.CLASS_EDITOR_EDIT_ATTRIBUTE:
      return state.set(
        'classAttributeIndexesToEdit',
        state.get('classAttributeIndexesToEdit').push(action.index)
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
      return clearEditingStatus(state).set(
        'selectedClass',
        state.get('selectedClassBackUp')
      );
    case actions.SPLIT_VIEW_CLOSE_EDIT:
      return clearEditingStatus(state)
        .set('selectedClass', null)
        .set('selectedClassBackUp', null);
    case actions.SPLIT_VIEW_ADD_NEW_ATTRIBUTE: {
      return state
        .setIn(
          ['selectedClass', 'props'],
          state.getIn(['selectedClass', 'props']).set('', '')
        )
        .set(
          'classAttributeIndexesToEdit',
          state
            .get('classAttributeIndexesToEdit')
            .push(state.getIn(['selectedClass', 'props']).size)
        );
    }
    case actions.CLASS_EDITOR_CLASS_EDITED:
      return state.set('isEditing', true);
    case actions.CLASS_EDITOR_UPDATE_CLASS_NAME:
      return state.setIn(['selectedClass', 'name'], action.name);
    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME:
      return state
        .setIn(
          ['selectedClass', 'props', action.newName],
          state.getIn(['selectedClass', 'props', action.attrName])
        )
        .deleteIn(['selectedClass', 'props', action.attrName]);
    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE:
      return state.setIn(
        ['selectedClass', 'props', action.attrName],
        action.attrType
      );
    case actions.CLASS_EDITOR_DELETE_ATTRIBUTE:
      return state.deleteIn(['selectedClass', 'props', action.attrName]);
    default:
      return state;
  }
}
