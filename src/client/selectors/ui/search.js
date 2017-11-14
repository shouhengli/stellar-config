const {List} = require('immutable');
const {createSelector} = require('reselect');

const searchSelector = (state) => state.getIn(['ui', 'search']);

const namesSelector = createSelector(
  searchSelector,
  (search) => search.get('names', List())
);

const textSelector = createSelector(
  searchSelector,
  (search) => search.get('text')
);

const visibleSelector = createSelector(
  searchSelector,
  (search) => search.get('visible')
);

module.exports = {
  namesSelector,
  textSelector,
  visibleSelector,
};
