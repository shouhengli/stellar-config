import { Map } from 'immutable';

export const classLinksSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassLinks']);

export const classLinkPositionsSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassLinkPositions'], Map());
