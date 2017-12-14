import { List } from 'immutable';
import actions from '../../actions';
import { combineReducers } from 'redux-immutable';
import graphSchema from './split-view/graph-schema';
import graphSchemaClasses from './split-view/graph-schema-classes';
import graphSchemaClassLinks from './split-view/graph-schema-class-links';

const selectedClass = (state = null, action) => {
  switch (action.type) {
    case actions.CLASS_LIST_CLASS_SELECTED:
      return action.selectedClass;
    case actions.CLASS_EDITOR_CANCEL_EDIT:
      return action.classBackup;
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return null;
    case actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE:
      return state.setIn(['props', ''], '');
    case actions.CLASS_EDITOR_UPDATE_CLASS_NAME:
      return state.set('name', action.name);
    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME:
      return state
        .setIn(
          ['props', action.newName],
          state.getIn(['props', action.attrName])
        )
        .deleteIn(['props', action.attrName]);
    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE:
      return state.setIn(['props', action.attrName], action.attrType);
    case actions.CLASS_EDITOR_DELETE_ATTRIBUTE:
      return state.deleteIn(['props', action.attrName]);
    default:
      return state;
  }
};

const selectedClassBackUp = (state = null, action) => {
  switch (action.type) {
    case actions.CLASS_LIST_CLASS_SELECTED:
      return action.selectedClass;
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return null;
    default:
      return state;
  }
};

const attributeIndexesToEdit = (state = List(), action) => {
  switch (action.type) {
    case actions.CLASS_EDITOR_EDIT_ATTRIBUTE:
      return state.push(action.index);
    case actions.CLASS_EDITOR_SAVE_EDIT:
    case actions.CLASS_EDITOR_CANCEL_EDIT:
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return List();
    default:
      return state;
  }
};

const linkIndexesToEdit = (state = List(), action) => {
  switch (action.type) {
    case actions.CLASS_EDITOR_EDIT_CLASS_LINK:
      return state.push(action.classLinkIndex);
    case actions.CLASS_EDITOR_SAVE_EDIT:
    case actions.CLASS_EDITOR_CANCEL_EDIT:
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return List();
    default:
      return state;
  }
};

const isEditingClassName = (state = false, action) => {
  switch (action.type) {
    case actions.CLASS_EDITOR_EDIT_CLASS_NAME:
      return true;
    case actions.CLASS_EDITOR_SAVE_EDIT:
    case actions.CLASS_EDITOR_CANCEL_EDIT:
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return false;
    default:
      return state;
  }
};

const isEditing = (state = false, action) => {
  switch (action.type) {
    case actions.CLASS_EDITOR_EDIT_ATTRIBUTE:
    case actions.CLASS_EDITOR_EDIT_CLASS_LINK:
    case actions.CLASS_EDITOR_EDIT_CLASS_NAME:
    case actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE:
      return true;
    case actions.CLASS_EDITOR_SAVE_EDIT:
    case actions.CLASS_EDITOR_CANCEL_EDIT:
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  selectedClass,
  selectedClassBackUp,
  attributeIndexesToEdit,
  linkIndexesToEdit,
  isEditingClassName,
  isEditing,
  graphSchema,
  graphSchemaClasses,
  graphSchemaClassLinks
});
