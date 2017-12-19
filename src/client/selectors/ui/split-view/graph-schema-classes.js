import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const classPositionsSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassPositions'], Map());

export const classesSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClasses'], Map());

export const selectedClassSelector = createSelector(classesSelector, classes =>
  classes.find(c => c.get('selected'))
);
