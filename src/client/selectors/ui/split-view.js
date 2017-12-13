import { createSelector } from 'reselect';

const splitViewSelector = state => state.getIn(['ui', 'splitView']);

export const selectedClassSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('selectedClass')
);

export const classAttributeIndexesToEditSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('classAttributeIndexesToEdit')
);

export const classLinkIndexesToEditSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('classLinkIndexesToEdit')
);

export const isEditingSelector = createSelector(splitViewSelector, splitView =>
  splitView.get('isEditing')
);

export const isEditingClassNameSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('isEditingClassName')
);
