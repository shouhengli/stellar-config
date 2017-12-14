import { createSelector } from 'reselect';
import { stagedClassLinksSelector } from './graph-schema-class-links';
import { selectedClassSelector } from '../split-view';
import { isNil } from 'ramda';
import { Set, Map } from 'immutable';

const classesSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClasses'], Map());

export const classListSelector = createSelector(classesSelector, classes =>
  classes.valueSeq()
);

export const relatedClassesSelector = createSelector(
  selectedClassSelector,
  stagedClassLinksSelector,
  classesSelector,
  (selectedClass, stagedClassLinks, classes) => {
    if (isNil(selectedClass)) {
      return classes;
    }
    const relatedClassNames = stagedClassLinks.reduce(
      (s, l) => s.add(l.get('source')).add(l.get('target')),
      Set()
    );
    return classes.filter(c => relatedClassNames.includes(c.get('name')));
  }
);
