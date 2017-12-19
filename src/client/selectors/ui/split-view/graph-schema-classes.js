import { createSelector } from 'reselect';
import { dimensionsSelector } from './graph-schema';
import { stagedClassLinksSelector } from './graph-schema-class-links';
import { isNil } from 'ramda';
import { Set, Map, fromJS } from 'immutable';

export const classesSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClasses'], Map());

export const selectedClassSelector = createSelector(classesSelector, classes =>
  classes.find(c => c.get('selected'))
);

export const stagedClassesSelector = createSelector(
  selectedClassSelector,
  stagedClassLinksSelector,
  classesSelector,
  (selectedClass, stagedClassLinks, classes) => {
    if (isNil(selectedClass)) {
      return classes;
    }
    const stagedClassNames = stagedClassLinks.reduce(
      (s, l) => s.add(l.get('source')).add(l.get('target')),
      Set()
    );
    return classes.filter(c => stagedClassNames.includes(c.get('name')));
  }
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
        .find(p => p.get('isEditing')) ||
      stagedClassLinks.valueSeq().find(l => l.get('isEditing')))
);

export const isEditingNameSelector = createSelector(
  selectedClassSelector,
  selectedClass => selectedClass && selectedClass.get('isEditingName')
);

export const classPositionsSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassPositions'], Map());

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
