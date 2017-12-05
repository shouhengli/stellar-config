import { createSelector } from 'reselect';
import { classLinksSelector } from './graph-schema-class-links';
import { selectedClassSelector } from './split-view';
import { isNil } from 'ramda';
import { Set } from 'immutable';

const allClassesSelector = state =>
  state.getIn(['ui', 'graphSchemaClasses']);

export const classesSelector = createSelector(
  selectedClassSelector, classLinksSelector, allClassesSelector,
  (selectedClass, relatedClassLinks, classes) => {
    if (isNil(selectedClass)) {
      return classes;
    }
    const relatedClassNames = relatedClassLinks.reduce((s, l) =>
      s.add(l.get('source')).add(l.get('target')), Set());
    return classes.filter(c => relatedClassNames.includes(c.get('name')));
  }
);
