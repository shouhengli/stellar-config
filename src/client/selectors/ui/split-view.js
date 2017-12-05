const { createSelector } = require('reselect');
const { defaultToEmptyString } = require('../../util');

const splitViewSelector = state => state.getIn(['ui', 'splitView']);

export const selectedClassSelector = createSelector(
  splitViewSelector,
  graphSchema => defaultToEmptyString(graphSchema.get('selectedClass'))
);
