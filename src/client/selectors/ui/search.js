const { List } = require('immutable');
const { createSelector } = require('reselect');

const searchSelector = state => state.getIn(['ui', 'search']);

export const namesSelector = createSelector(searchSelector, search =>
  search.get('names', List())
);

export const textSelector = createSelector(searchSelector, search =>
  search.get('text')
);

export const visibleSelector = createSelector(searchSelector, search =>
  search.get('visible')
);
