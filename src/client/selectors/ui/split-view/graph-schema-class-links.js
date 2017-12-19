import { createSelector } from 'reselect';
import { Map, fromJS } from 'immutable';

export const classLinksSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassLinks']);

export const stagedClassLinksSelector = createSelector(
  classLinksSelector,
  classLinks => {
    const stagedClassLinks = classLinks.filter(c => c.get('staged'));
    return stagedClassLinks.isEmpty() ? classLinks : stagedClassLinks;
  }
);

export const classLinkPositionsSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassLinkPositions'], Map());

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
