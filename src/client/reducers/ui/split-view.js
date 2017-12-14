import { List, Map, fromJS } from 'immutable';
import { isNil, contains } from 'ramda';
import actions from '../../actions';
import { combineReducers } from 'redux-immutable';
import graphSchema from './split-view/graph-schema';
import graphSchemaClasses from './split-view/graph-schema-classes';
import graphSchemaClassLinks from './split-view/graph-schema-class-links';

let selectedClassBackUp = null;

const selectedClass = (state = null, action) => {
  switch (action.type) {
    case actions.CLASS_LIST_CLASS_SELECTED:
      selectedClassBackUp = action.selectedClass;
      return action.selectedClass;
    case actions.CLASS_EDITOR_CANCEL_EDIT:
      return selectedClassBackUp;
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return (selectedClassBackUp = null);
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

let stagedClassLinksBackUp = Map();

const stagedClassLinks = (state = Map(), action) => {
  switch (action.type) {
    case actions.CLASS_EDITOR_UPDATE_STAGED_CLASS_LINKS: {
      const { selectedClass, classLinks } = action;
      if (isNil(selectedClass)) {
        return classLinks;
      }
      stagedClassLinksBackUp = classLinks
        .valueSeq()
        .filter(link =>
          contains(selectedClass.get('name'), [
            link.get('source'),
            link.get('target')
          ])
        )
        .toList();
      return stagedClassLinksBackUp;
    }
    case actions.CLASS_EDITOR_CLOSE_EDIT: {
      stagedClassLinksBackUp = Map();
      return stagedClassLinksBackUp;
    }
    case actions.CLASS_EDITOR_ADD_NEW_LINK:
      return state.push(fromJS({ name: '', source: '', target: '' }));
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
  stagedClassLinks,
  attributeIndexesToEdit,
  linkIndexesToEdit,
  isEditingClassName,
  isEditing,
  graphSchema,
  graphSchemaClasses,
  graphSchemaClassLinks
});
