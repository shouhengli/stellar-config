const reduceClassesState = require('./graph-schema/classes');
const reduceClassLinksState = require('./graph-schema/class-links');

const {combineReducers} = require('redux-immutable');

module.exports = combineReducers({
  classes: reduceClassesState,
  classLinks: reduceClassLinksState,
});
