import actions from '../../actions';

const createChainedEditAction = action => dispatch => {
  dispatch(action);
  dispatch({ type: actions.CLASS_EDITOR_CLASS_EDITED });
};

export function classSelected(selectedClass) {
  return {
    type: actions.SPLIT_VIEW_CLASS_SELECTED,
    selectedClass
  };
}

export function addNewClass(cls) {
  return createChainedEditAction({
    type: actions.SPLIT_VIEW_ADD_NEW_CLASS,
    class: cls
  });
}

export function editAttribute(index) {
  return createChainedEditAction({
    type: actions.CLASS_EDITOR_EDIT_ATTRIBUTE,
    index
  });
}

export function editClassLink(classLinkIndex) {
  return createChainedEditAction({
    type: actions.SPLIT_VIEW_EDIT_CLASS_LINK,
    classLinkIndex
  });
}

export function editClassName() {
  return createChainedEditAction({
    type: actions.SPLIT_VIEW_EDIT_CLASS_NAME
  });
}

export function saveEdit() {
  return {
    type: actions.SPLIT_VIEW_SAVE_EDIT
  };
}

export function cancelEdit() {
  return {
    type: actions.SPLIT_VIEW_CANCEL_EDIT
  };
}

export function closeEdit() {
  return {
    type: actions.SPLIT_VIEW_CLOSE_EDIT
  };
}

export function addNewAttribute() {
  return createChainedEditAction({
    type: actions.SPLIT_VIEW_ADD_NEW_ATTRIBUTE
  });
}

export function addNewLink() {
  return createChainedEditAction({
    type: actions.SPLIT_VIEW_ADD_NEW_LINK
  });
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
