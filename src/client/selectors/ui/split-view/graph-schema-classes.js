import { createSelector } from 'reselect';
import { relatedClassLinksSelector } from './graph-schema-class-links';
import { selectedClassSelector } from '../split-view';
import { isNil } from 'ramda';
import { Set, Map } from 'immutable';

const allClassesSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClasses'], Map());

export const classListSelector = createSelector(allClassesSelector, classes =>
  classes.valueSeq()
);

export const relatedClassesSelector = createSelector(
  selectedClassSelector,
  relatedClassLinksSelector,
  allClassesSelector,
  (selectedClass, relatedClassLinks, classes) => {
    if (isNil(selectedClass)) {
      return classes;
    }
    const relatedClassNames = relatedClassLinks.reduce(
      (s, l) => s.add(l.get('source')).add(l.get('target')),
      Set()
    );
    return classes.filter(c => relatedClassNames.includes(c.get('name')));
  }
);
