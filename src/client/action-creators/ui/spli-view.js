import actions from '../../actions';

export function classSelected(selectedClass) {
  return {
    type: actions.SPLIT_VIEW_CLASS_SELECTED,
    selectedClass
  };
}
