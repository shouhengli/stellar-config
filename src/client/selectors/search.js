const {List} = require('immutable');

const configNamesSelector = (state) => state.getIn(['search', 'names'], List());

const searchTextSelector = (state) => state.getIn(['search', 'text']);

module.exports = {
  configNamesSelector,
  searchTextSelector,
};
