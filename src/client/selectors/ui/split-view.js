import { createSelector } from 'reselect';

const splitViewSelector = state => state.getIn(['ui', 'splitView']);

export const selectedClassSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('selectedClass')
);

export const attributeIndexesToEditSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('attributeIndexesToEdit')
);

export const linkIndexesToEditSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('linkIndexesToEdit')
);

export const isEditingSelector = createSelector(splitViewSelector, splitView =>
  splitView.get('isEditing')
);

export const isEditingClassNameSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('isEditingClassName')
);
