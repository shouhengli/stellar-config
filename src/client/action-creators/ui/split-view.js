import actions from '../../actions';
import { fromJS } from 'immutable';

export function classSelected(selectedClass) {
  return {
    type: actions.SPLIT_VIEW_CLASS_SELECTED,
    selectedClass
  };
}

export function addNewClass() {
  return {
    type: actions.SPLIT_VIEW_CLASS_SELECTED,
    selectedClass: fromJS({ props: {} })
  };
}

export function editAttribute(classIndex) {
  return {
    type: actions.SPLIT_VIEW_EDIT_CLASS,
    classIndex
  };
}

export function editClassLink(classLinkIndex) {
  return {
    type: actions.SPLIT_VIEW_EDIT_CLASS_LINK,
    classLinkIndex
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
