import actions from '../../actions';
import P from 'bluebird';

export function classSelected(selectedClass) {
  return {
    type: actions.CLASS_LIST_CLASS_SELECTED,
    selectedClass
  };
}

export function addNewClass(newClass) {
  return dispatch =>
    P.try(() =>
      dispatch({
        type: actions.CLASS_LIST_ADD_NEW_CLASS,
        newClass
      })
    ).then(() => dispatch(classSelected(newClass)));
}

export function editAttribute(attribute, selectedClass) {
  return {
    type: actions.CLASS_EDITOR_EDIT_ATTRIBUTE,
    attribute,
    selectedClass
  };
}

export function editClassLink(classLink) {
  return {
    type: actions.CLASS_EDITOR_EDIT_CLASS_LINK,
    classLink
  };
}

export function editClassName(selectedClass) {
  return {
    type: actions.CLASS_EDITOR_EDIT_CLASS_NAME,
    selectedClass
  };
}

export function saveEdit() {
  return {
    type: actions.CLASS_EDITOR_SAVE_EDIT
  };
}

export function closeEdit() {
  return {
    type: actions.CLASS_EDITOR_CLOSE_EDIT
  };
}

export function addNewAttribute(selectedClass) {
  return {
    type: actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE,
    selectedClass
  };
}

export function updateClassName(name, selectedClass) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_CLASS_NAME,
    name,
    selectedClass
  };
}

export function updateAttributeType(attribute, attrType, selectedClass) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE,
    attribute,
    attrType,
    selectedClass
  };
}

export function updateAttributeName(attribute, newName, selectedClass) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME,
    attribute,
    newName,
    selectedClass
  };
}

export function deleteAttribute(attribute, selectedClass) {
  return {
    type: actions.CLASS_EDITOR_DELETE_ATTRIBUTE,
    attribute,
    selectedClass
  };
}

export function addNewLink(selectedClass) {
  return {
    type: actions.CLASS_EDITOR_ADD_NEW_LINK,
    selectedClass
  };
}

export function updateLinkName(link, newName) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_LINK_NAME,
    link,
    newName
  };
}

export function updateLinkSource(link, newSource) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_LINK_SOURCE,
    link,
    newSource
  };
}

export function updateLinkTarget(link, newTarget) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_LINK_TARGET,
    link,
    newTarget
  };
}

export function deleteLink(link) {
  return {
    type: actions.CLASS_EDITOR_DELETE_LINK,
    link
  };
}
