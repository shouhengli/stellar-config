import actions from '../../actions';

export function classSelected(selectedClass) {
  return {
    type: actions.CLASS_LIST_CLASS_SELECTED,
    selectedClass
  };
}

export function addNewClass(cls) {
  return {
    type: actions.CLASS_LIST_ADD_NEW_CLASS,
    class: cls
  };
}

export function editAttribute(index) {
  return {
    type: actions.CLASS_EDITOR_EDIT_ATTRIBUTE,
    index
  };
}

export function editClassLink(classLinkIndex) {
  return {
    type: actions.CLASS_EDITOR_EDIT_CLASS_LINK,
    classLinkIndex
  };
}

export function editClassName() {
  return {
    type: actions.CLASS_EDITOR_EDIT_CLASS_NAME
  };
}

export function saveEdit() {
  return {
    type: actions.CLASS_EDITOR_SAVE_EDIT
  };
}

export function cancelEdit(classBackup) {
  return {
    type: actions.CLASS_EDITOR_CANCEL_EDIT,
    classBackup
  };
}

export function closeEdit() {
  return {
    type: actions.CLASS_EDITOR_CLOSE_EDIT
  };
}

export function addNewAttribute() {
  return {
    type: actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE
  };
}

export function addNewLink() {
  return {
    type: actions.SPLIT_VIEW_ADD_NEW_LINK
  };
}

export function updateClassName(name) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_CLASS_NAME,
    name
  };
}

export function updateAttributeType(attrName, attrType) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE,
    attrType,
    attrName
  };
}

export function updateAttributeName(attrName, newName) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME,
    attrName,
    newName
  };
}

export function deleteAttribute(attrName) {
  return {
    type: actions.CLASS_EDITOR_DELETE_ATTRIBUTE,
    attrName
  };
}
