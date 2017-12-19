import { selectedClassSelector } from './graph-schema-classes';
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import {
  classLinkPositionsSelector,
  classLinksSelector
} from './graph-schema-class-links';

export const stagedClassLinksSelector = createSelector(
  selectedClassSelector,
  classLinksSelector,
  (selectedClass, classLinks) => {
    if (!selectedClass) return classLinks;
    return classLinks.filter(c => c.get('staged'));
  }
);

export const positionedStagedClassLinksSelector = createSelector(
  stagedClassLinksSelector,
  classLinkPositionsSelector,
  (classLinks, positions) =>
    classLinks.map((l, i) =>
      l.merge(
        positions.get(
          i,
          fromJS({
            x: 0,
            y: 0,
            length: 0
          })
        )
      )
    )
);
