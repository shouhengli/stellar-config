export const classLinksSelector = state =>
  state.getIn(['ui', 'splitView', 'graphSchemaClassLinks']);

export const stagedClassLinksSelector = state =>
  state.getIn(['ui', 'splitView', 'stagedClassLinks']);
