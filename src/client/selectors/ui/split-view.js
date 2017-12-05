import { createSelector } from 'reselect';
import { classLinksSelector } from '../ingestion-profile';
import { isNil, contains } from 'ramda';
import { List } from 'immutable';

const splitViewSelector = state => state.getIn(['ui', 'splitView']);

export const selectedClassSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('selectedClass')
);

export const relatedClassLinksSelector = createSelector(
  selectedClassSelector,
  classLinksSelector,
  (selectedClass, classLinks) =>
    isNil(selectedClass) ? List() :
      classLinks.valueSeq().filter(link =>
        contains(selectedClass.get('name'), [link.get('source'), link.get('target')]))
);
