import { createSelector } from 'reselect';
import { defaultToEmptyString } from '../../util';
import { classLinksSelector } from './graph-schema-class-links';
import R from 'ramda';

const splitViewSelector = state => state.getIn(['ui', 'splitView']);

export const selectedClassSelector = createSelector(
  splitViewSelector,
  splitView => defaultToEmptyString(splitView.get('selectedClass'))
);

export const relatedClassLinksSelector = createSelector(
  selectedClassSelector,
  classLinksSelector,
  (selectedClass, classLinks) => classLinks.valueSeq().toList().filter(link =>
    R.contains(selectedClass.name, [link.get('source'), link.get('target')]))
);
