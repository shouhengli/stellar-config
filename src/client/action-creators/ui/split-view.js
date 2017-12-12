import actions from '../../actions';

export function classSelected(selectedClass) {
  return {
    type: actions.SPLIT_VIEW_CLASS_SELECTED,
    selectedClass
  };
}

export function addNewClass(cls) {
  return {
    type: actions.SPLIT_VIEW_ADD_NEW_CLASS,
    class: cls
  };
}

export function editAttribute(classIndex) {
  return dispatch => {
    dispatch({
      type: actions.SPLIT_VIEW_EDIT_CLASS,
      classIndex
    });
    dispatch({ type: actions.GRAPH_SCHEMA_SET_GRAPH_SCHEMA });
  };
}

export function editClassLink(classLinkIndex) {
  return {
    type: actions.SPLIT_VIEW_EDIT_CLASS_LINK,
    classLinkIndex
  };
}

export function editClassName() {
  return {
    type: actions.SPLIT_VIEW_EDIT_CLASS_NAME
  };
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
  return {
    type: actions.SPLIT_VIEW_ADD_NEW_ATTRIBUTE
  };
}

export function addNewLink() {
  return {
    type: actions.SPLIT_VIEW_ADD_NEW_LINK
  };
}
