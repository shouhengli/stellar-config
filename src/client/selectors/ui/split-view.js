import { createSelector } from 'reselect';
import { classLinksSelector } from './graph-schema-class-links';
import { classesSelector } from './graph-schema-classes';
import R from 'ramda';
import { List, Set } from 'immutable';

const splitViewSelector = state => state.getIn(['ui', 'splitView']);

export const selectedClassSelector = createSelector(
  splitViewSelector,
  splitView => splitView.get('selectedClass')
);

export const relatedClassLinksSelector = createSelector(
  selectedClassSelector,
  classLinksSelector,
  (selectedClass, classLinks) =>
    R.isNil(selectedClass) ? List() :
      classLinks.valueSeq().filter(link =>
        R.contains(selectedClass.get('name'), [link.get('source'), link.get('target')]))
);

export const relatedClassesSelector = createSelector(
  relatedClassLinksSelector, classesSelector,
  (relatedClassLinks, classes) => {
    const relatedClassNames = relatedClassLinks.reduce((s, l) =>
      s.add(l.get('source')).add(l.get('target')), Set());
    return classes.filter(c => relatedClassNames.includes(c.get('name')));
  }
);
