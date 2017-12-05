import { selectedClassSelector } from './split-view';
import { createSelector } from 'reselect';
import { isNil, contains } from 'ramda';

const allClassLinksSelector = state =>
  state.getIn(['ui', 'graphSchemaClassLinks']);

export const classLinksSelector = createSelector(
  selectedClassSelector,
  allClassLinksSelector,
  (selectedClass, classLinks) => {
    if (isNil(selectedClass)) {
      return classLinks;
    }
    return classLinks.valueSeq().filter(link =>
      contains(selectedClass.get('name'), [link.get('source'), link.get('target')]));
  }
);
