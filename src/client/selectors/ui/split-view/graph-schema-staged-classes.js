import { createSelector } from 'reselect';
import {
  selectedClassSelector,
  classesSelector,
  classPositionsSelector
} from './graph-schema-classes';
import { stagedClassLinksSelector } from './graph-schema-staged-class-links';
import { isNil } from 'ramda';
import { Set, fromJS } from 'immutable';
import { dimensionsSelector } from './graph-schema';

export const stagedClassesSelector = createSelector(
  selectedClassSelector,
  stagedClassLinksSelector,
  classesSelector,
  (selectedClass, stagedClassLinks, classes) => {
    if (isNil(selectedClass)) {
      return classes;
    }
    const stagedClassNames = stagedClassLinks
      .reduce((s, l) => s.add(l.get('source')).add(l.get('target')), Set())
      .add(selectedClass.get('name'));
    return classes.filter(c => stagedClassNames.includes(c.get('name')));
  }
);

export const positionedStagedClassSelector = createSelector(
  stagedClassesSelector,
  classPositionsSelector,
  dimensionsSelector,
  (classes, positions, dimensions) =>
    classes.map((c, i) =>
      c.merge(
        positions.get(
          i,
          fromJS({
            x: dimensions.get(0) / 2,
            y: dimensions.get(1) / 2,
            tooltipVisibleProp: null,
            outerRadius: 75
          })
        )
      )
    )
);

export const isEditingSelector = createSelector(
  selectedClassSelector,
  stagedClassLinksSelector,
  (selectedClass, stagedClassLinks) =>
    selectedClass &&
    (selectedClass.get('isEditingName') ||
      selectedClass
        .get('props')
        .valueSeq()
        .find(p => p.get('isEditing') || p.get('isDeleted')) ||
      stagedClassLinks
        .valueSeq()
        .find(l => l.get('isEditing') || l.get('isDeleted')))
);
