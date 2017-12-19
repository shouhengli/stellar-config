import actions from '../../actions';

export function classSelected(selectedClass) {
  return {
    type: actions.CLASS_LIST_CLASS_SELECTED,
    selectedClass
  };
}

export function addNewClass() {
  return {
    type: actions.CLASS_LIST_ADD_NEW_CLASS
  };
}

export function editAttribute(attribute) {
  return {
    type: actions.CLASS_EDITOR_EDIT_ATTRIBUTE,
    attribute
  };
}

export function editClassLink(classLink) {
  return {
    type: actions.CLASS_EDITOR_EDIT_CLASS_LINK,
    classLink
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

export function cancelEdit() {
  return {
    type: actions.CLASS_EDITOR_CANCEL_EDIT
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

export function addNewLink(selectedClass) {
  return {
    type: actions.CLASS_EDITOR_ADD_NEW_LINK,
    selectedClass
  };
}

export function updateClassName(name) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_CLASS_NAME,
    name
  };
}

export function updateAttributeType(attribute, attrType) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE,
    attribute,
    attrType
  };
}

export function updateAttributeName(attribute, newName) {
  return {
    type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME,
    attribute,
    newName
  };
}

export function deleteAttribute(attribute) {
  return {
    type: actions.CLASS_EDITOR_DELETE_ATTRIBUTE,
    attribute
  };
}
