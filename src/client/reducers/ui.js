const reduceIngestionProfileState = require('./ui/ingestion-profile');
const reduceGraphSchemaState = require('./ui/graph-schema');
const reduceGraphSchemaClassesState = require('./ui/graph-schema-classes');
const reduceGraphSchemaClassLinksState = require('./ui/graph-schema-class-links');
const reduceSearchState = require('./ui/search');
const reduceViewState = require('./ui/view');

const { combineReducers } = require('redux-immutable');

module.exports = combineReducers({
  ingestionProfile: reduceIngestionProfileState,
  graphSchema: reduceGraphSchemaState,
  graphSchemaClasses: reduceGraphSchemaClassesState,
  graphSchemaClassLinks: reduceGraphSchemaClassLinksState,
  search: reduceSearchState,
  view: reduceViewState
});
